import {subscriptionManager} from '../../notifications';

// get the current user info
export function currentSession(req, res) {
  res.status(200).send(req.user);
}

export function notificationSubscribe(req, res){
  subscriptionManager.addSubscription(req.body, req.user.id);
  res.status(200).json({message: 'Subscription set.'});
}