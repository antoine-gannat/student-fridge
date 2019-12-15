import * as jwt from 'jsonwebtoken';
import Token from '../../declarations/token';
import * as bcrypt from 'bcryptjs';
import * as waterfall from 'async-waterfall';
import HttpResponse from 'declarations/httpResponse';
import database from '../../database';
import logger from '../../loggers/logger';
import httpCodes from '../../declarations/httpCodes';

// check if the username or email is already taken
function checkUsernameAndEmail(email: string, username: string, callback: any) {
  database.query("SELECT `id` FROM `users` WHERE `email` = ? OR `username` = ?", [email, username]).then((result) => {
    if (result && result.length > 0) {
      callback({ code: 400, message: 'Username or email already taken' });
      return;
    }
    callback(null);
  }).catch((error) => {
    logger.error(error)
    callback({ code: 500, message: "Internal error." });
  });
}

export function getUserInfo(userId: number) {
  return (new Promise((resolve, reject) => {
    database.query("SELECT `id`, `username` FROM `users` WHERE `id` = ?", [userId])
      .then((userInfo) => {
        // if no data is found
        if (!userInfo || userInfo.length === 0) {
          reject({ code: 400, message: "Failed to get the user info" });
          return;
        }
        // success
        resolve(userInfo[0]);
      })
      .catch(err => {
        reject(err);
      });
  }));
}

function setAccessToken(req, res, userId) {
  let token = new Token(req, res);
  let generatedToken;
  return (new Promise((resolve, reject) => {
    // try to generate a token
    try {
      generatedToken = jwt.sign({ id: userId }, process.env.STUDENTFRIDGE_JWT_PASSWORD);
    }
    catch (err) {
      logger.error("JWT error: ", err);
      return reject(httpCodes.INTERNAL_ERROR);
    }
    // set the token
    token.set(generatedToken);
    resolve();
  }));
}

function hashPassword(password) {
  return (new Promise((resolve, reject) => {
    bcrypt.hash(password, 8)
      .then((hashedPassword) => resolve(hashedPassword))
      .catch(err => {
        logger.error("Bcrypt error:", err);
        reject(httpCodes.INTERNAL_ERROR);
      });
  }))
}

export function signUp(req, res) {
  waterfall([
    // check if the username and email are free
    function (callback) {
      checkUsernameAndEmail(req.body.email, req.body.username, callback);
    },
    // hash the password
    function (callback) {
      hashPassword(req.body.password)
        .then((hashedPassword) => {
          callback(null, hashedPassword);
        })
        .catch(err => {
          logger.error("Bcrypt error:", err);
          callback(err);
        });
    },
    // store the user in the database
    function (hashedPassword, callback) {
      database.query("INSERT INTO `users`(email,username,password) VALUES(?,?,?)",
        [req.body.email, req.body.username, hashedPassword])
        .then((insertResult) => callback(null, insertResult))
        .catch((err) => {
          callback(err);
        });
    },
    // get back the inserted user infos
    function (insertResult, callback) {
      getUserInfo(insertResult.insertId).then((userInfo) => {
        callback(null, userInfo);
      }).catch((err) => {
        callback(err);
      });
    }
  ],
    // waterfall result
    function (error: HttpResponse, result) {
      // on error
      if (error) {
        return res.status(error.code).send(error);
      }
      // on success
      else {
        // set the access token
        setAccessToken(req, res, result.id).then(() => {
          res.status(result.code || 200).send(result);
        }).catch((err) => {
          res.status(err.code).send(err);
        });
      }
    })
}

export function signIn(req, res) {
  waterfall([
    // hash the user's password
    function (callback) {
      hashPassword(req.body.password)
        .then((hashedPassword) => {
          callback(null, hashedPassword);
        })
        .catch((err) => {
          callback(err);
        });
    },
    // search if the user with the email 'req.body.email' exist
    // then get its password and check if it match the 'req.body.password'
    function (hashedPassword, callback) {
      database.query('SELECT `id`, `password` FROM `users` WHERE `email` = ?', [req.body.email]).then((user) => {
        // if the email was not found
        if (!user || user.length === 0 || !user[0].password) {
          callback({ code: 400, message: 'Account not found.' });
          return;
        }
        const userPassword = user[0].password;
        bcrypt.compare(hashedPassword, userPassword, (err, res) => {
          if (err) {
            callback({ code: 400, message: 'Password invalid.' });
            return;
          }
          callback(null, user[0].id);
        });
      }).catch((error) => {
        callback(error);
      })
    },
    // get the user infos and generate the JWT token
    function (userId, callback) {
      // get the user infos
      getUserInfo(userId).then((userInfo) => {
        // set the access token
        setAccessToken(req, res, userId).then(() => {
          // on success
          callback(null, { message: 'Signed in !', user: userInfo });
        }).catch((err) => {
          // on error
          callback(err);
        });
      }).catch((err) => {
        // on error
        callback(err);
      });
    }
  ],
    // result
    function (error, result) {
      if (error) {
        return res.status(error.code).send(error);
      }
      res.status(200).send(result);
    }
  );
}


export function signOut(req, res) {
  let token = new Token(req, res);
  // delete the token from the cookies
  token.delete();
  res.status(200).send({ message: 'Disconnected' });
}