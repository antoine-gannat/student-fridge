import logger from './loggers/logger';
import * as webPush from 'web-push';

interface Notification{
    title:string,
    body:string
}

class NotificationSubscription{
    // User id
    userId: number;
    // Subscription object
    subscription: object;
    // creation date in ms
    creationDate: number;
    constructor(userId: number, subscription: object){
        this.creationDate = new Date().getTime();
        this.userId = userId;
        this.subscription = subscription;
    }

    update(newSubscription) {
        // update the date
        this.creationDate = new Date().getTime();
        // update the subscription
        this.subscription = newSubscription;
    }
}

class SubscriptionManager{
    subscriptions: Array<NotificationSubscription>;
    static subMaxAge = 4*7*24*60*60*1000; // 4 weeks in ms
    constructor() {
        this.subscriptions = []
    }

    addSubscription(sub: object, userId: number){
        // search if this user already has a subscription
        let existingSub = this.subscriptions.find((s) => s.userId === userId);
        // update the existing subscription
        if (existingSub){
            existingSub.update(sub);
            return;
        }
        // if this user has no subscription, create a new one
        this.subscriptions.push(new NotificationSubscription(userId, sub));
        logger.info("New notification subscription, total:", this.subscriptions.length);
    }

    removeOutdatedSubscriptions(){
        // calculate the oldest date acceptable
        let oldestDateAcceptable = new Date().getTime() - SubscriptionManager.subMaxAge;
        let beforeLength = this.subscriptions.length;
        for (let i = 0; i < this.subscriptions.length; i++){
            // if the date is older than the oldest acceptable date
            if (this.subscriptions[i].creationDate <= oldestDateAcceptable){
                this.subscriptions.splice(i, 1);
                i--;
            }
        }
        if (this.subscriptions.length !== beforeLength){
            logger.info(beforeLength - this.subscriptions.length, "outdated notification subscription removed.");
        }
    }

    getUserSubscription(userId: number){
        return (this.subscriptions.find((s) => s.userId === userId));
    }
}

export let subscriptionManager = new SubscriptionManager();

// initialize web-push
export function webPushInit(email:string){
    webPush.setVapidDetails('mailto:' + email, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
}

// send a notification to a subscription
export function sendNotification(subscription: NotificationSubscription, notification: Notification){
    if (!subscription){
        logger.error("sendNotification: ERROR! Subscription invalid.");
        return;
    }
    webPush.sendNotification(subscription.subscription, JSON.stringify(notification));
}

// send a notification to every subscription
export function sendNotificationToAll(notification: Notification){
    subscriptionManager.subscriptions.forEach((sub) => {
        sendNotification(sub, notification);
    })
}