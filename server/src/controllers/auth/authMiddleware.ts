import * as jwt from 'jsonwebtoken';
import Token from '../../declarations/token';
import { getUserInfo } from './auth';
import httpCodes from '../../declarations/httpCodes';
import logger from '../../loggers/logger';

const whiteList = ["/api/auth"]

function isWhitelisted(request): boolean {
  // if the url doesn't start with '/api', whitelist it
  if (!request.req.url.startsWith("/api")) {
    return (true);
  }
  // check if the current url starts with any of the whitelisted urls
  for (let i = 0; i < whiteList.length; i++) {
    let url = whiteList[i];
    if (request.req.url && request.req.url.startsWith(url)) {
      return (true);
    }
  }
  return (false);
}
// middleware to check if the user has access to restricted routes
export default function (request, reply, done) {
  // if the url is whitelisted, continue
  if (isWhitelisted(request)) {
    done();
    return;
  }
  // instantiate the token class
  let token = new Token(request.req, reply.res);

  // if no token is found, return 'Unauthorized'
  if (!token.get()) {
    reply.status(httpCodes.UNAUTHORIZED.code).send(httpCodes.UNAUTHORIZED);
    return;
  }
  let userId: number;
  // verify if the token is valid, and get the user's id stored in it
  try {
    userId = jwt.verify(token.get(), process.env.STUDENTFRIDGE_JWT_PASSWORD).id;
  }
  catch (err) {
    reply.status(httpCodes.UNAUTHORIZED.code).send(httpCodes.UNAUTHORIZED);
    return;
  }
  // get the user info from the userid stored in the token
  getUserInfo(userId)
    .then((userInfo) => {
      // save the userinfo for the following controller
      request.req.user = userInfo;
      done();
    })
    // on error, send unauthorized
    .catch((err) => {
      // delete the token
      token.delete();
      reply.status(httpCodes.UNAUTHORIZED.code).send(httpCodes.UNAUTHORIZED);
      return;
    });
}