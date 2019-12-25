import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as  http from 'http';
import * as  https from 'http';
import { OpenApiValidator } from 'express-openapi-validator';
import requestsLogger from './loggers/requestsLogger';
import logger from './loggers/logger';
import service from './service';
import database from './database';
import authMiddleware from './controllers/auth/authMiddleware';
import { ServerOptions } from 'https';
// Initialize the database
database.connect();

// Set the port
const port = Number(process.env.PORT) || 4000;

const app = express();

new OpenApiValidator({
  apiSpec: path.join(__dirname, 'openapi.yaml')
})
  .install(app)
  .then(() => {
    // Set static routes
    // Serve a static route to serve the client
    logger.info("Serving frontend from folder: ", path.join(__dirname, '../../webapp/dist'));
    app.use('/', express.static(path.join(__dirname, '../../webapp/dist')));
    // serve the uploaded files
    logger.info('Serving static-files from :', path.join(__dirname, '../static-files'));
    app.use('/static-files', express.static(path.join(__dirname, '../static-files')));

    // set middlewares to decode requests
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.text());
    app.use(bodyParser.json());

    // Handle file upload
    // app.use(fileUpload());

    // Set the request logger
    app.use(requestsLogger);

    // Set the auth middleware
    app.use('/api', authMiddleware);
    // Route declaration //
    // auth
    app.post('/auth/signup/', service.auth.signUp);
    app.post('/auth/signin/', service.auth.signIn);
    app.delete('/auth/signout/', service.auth.signOut);

    // products
    app.get('/api/products/', service.product.getProducts);
    app.post('/api/products/', service.product.addProduct);

    // user
    app.get('/api/user/current-session', service.user.currentSession);

    // start the server
    if (process.env.NODE_DEBUG) {
      http.createServer(app).listen(port, "0.0.0.0", () => {
        logger.log(`Dev server listening on port ${port}`);
      });
    } else {
      logger.log("loading ssl keys.")
      // Certificate
      const credentials: any = {
        key: fs.readFileSync('/etc/letsencrypt/live/student-fridge.fr/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/student-fridge.fr/cert.pem', 'utf8')
      }
      https.createServer(credentials, app).listen(port, () => {
        logger.log(`HTTPS server listening on port ${port}`);
      });
    }
  });
// if production mode
if (!process.env.NODE_DEBUG) {

  let httpApp = express();
  const httpPort = 80;
  httpApp.use(function (req, res, next) {
    logger.log("HTTP server, request received");
    if (req.secure) {
      logger.log("HTTP server, request already https");
      next();
    } else {
      logger.log("HTTP server, redirecting to https://" + req.headers.host + req.url);
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  httpApp.listen(httpPort, '0.0.0.0', () => {
    logger.log('HTTP server listening on port', httpPort)
  });
}