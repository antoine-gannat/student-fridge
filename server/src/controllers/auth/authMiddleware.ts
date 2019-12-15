import * as jwt from 'jsonwebtoken';
import Token from '../../declarations/token';
import { getUserInfo } from './auth';
import httpCodes from '../../declarations/httpCodes';
// middleware to check if the user has access to restricted routes
export default function (req, res, done) {
  // instantiate the token class
  let token = new Token(req, res);

  // if no token is found, return 'Unauthorized'
  if (!token.get()) {
    res.status(httpCodes.UNAUTHORIZED.code).send(httpCodes.UNAUTHORIZED);
    return;
  }
  let userId: number;
  // verify if the token is valid, and get the user's id stored in it
  try {
    userId = jwt.verify(token.get(), process.env.STUDENTFRIDGE_JWT_PASSWORD).id;
  }
  catch (err) {
    res.status(httpCodes.UNAUTHORIZED.code).send(httpCodes.UNAUTHORIZED);
    return;
  }
  // get the user info from the userid stored in the token
  getUserInfo(userId)
    .then((userInfo) => {
      // save the userinfo for the following controller
      req.user = userInfo;
      done();
    })
    // on error, send unauthorized
    .catch((err) => {
      // delete the token
      token.delete();
      res.status(httpCodes.UNAUTHORIZED.code).send(httpCodes.UNAUTHORIZED);
      return;
    });
}