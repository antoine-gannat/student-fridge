import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as  http from 'http';
import { OpenApiValidator } from 'express-openapi-validator';
import requestsLogger from './loggers/requestsLogger';
import logger from './loggers/logger';
import service from './service';
import database from './database';
import authMiddleware from './controllers/auth/authMiddleware';
// Initialize the database
database.connect();

// Set the port
const port = Number(process.env.PORT) || 4000;

// if production mode
if (!process.env.NODE_DEBUG) {
  logger.log("loading ssl keys.")
  // Certificate
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/student-fridge.fr/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/student-fridge.fr/cert.pem', 'utf8');

}
const app = express();

// Register a static route to serve the client
logger.log("Serving frontend from folder: ", path.join(__dirname, '../../webapp/dist'));

// Set static routes
app.use('/', express.static(path.join(__dirname, '../../webapp/dist')));
app.use('/data', express.static(path.join(__dirname, '../static-files')));

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

new OpenApiValidator({
  apiSpec: path.join(__dirname, 'openapi.yaml')
})
  .install(app)
  .then(() => {
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
    http.createServer(app).listen(port, "0.0.0.0", () => {
      logger.log(`Listening on port ${port}`);
    });
  });

// // if production mode
// if (!process.env.NODE_DEBUG) {

//   // Start another to redirect HTTP requests to HTTPS 
//   let fastifyHttp = Fastify();

//   fastifyHttp.all('/', (req, res) => {
//     const {
//       headers: { host },
//       url
//     } = req.req;
//     if (host) {
//       const redirectUrl = `https://${host.split(":")[0]}${url}`;
//       res.res.writeHead(301, {
//         Location: redirectUrl
//       });
//       res.res.end();
//     }
//     else {
//       res.status(400).send({ message: 'HTTP is not supported, please use HTTPS' });
//     }
//   })

//   fastifyHttp.listen(80, "0.0.0.0", (err, address) => {
//     if (err) {
//       logger.error(err.message);
//       return;
//     }
//     logger.log("HTTP Server listening on address", address);
//   })

// }