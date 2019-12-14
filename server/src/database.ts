import * as mysql from 'mysql';
import HttpResponse from './declarations/httpResponse';
import httpCodes from './declarations/httpCodes';
import logger from './loggers/logger';

class Database {
  db: any;
  // connect to the database
  connect() {
    this.db = mysql.createPool({
      connectionLimit: 10,
      host: process.env.STUDENTFRIDGE_DB_HOST,
      user: process.env.STUDENTFRIDGE_DB_USERNAME,
      password: process.env.STUDENTFRIDGE_DB_PASSWORD,
      database: process.env.STUDENTFRIDGE_DB_NAME
    });
    this.db.getConnection((err, connection) => {
      if (err) {
        throw new Error(err);
      }
      connection.release();
    })
  }
  query(query: string, params?: any[]): Promise<any> {
    if (!this.db) {
      return new Promise((resolve, reject) => {
        reject({ code: 500, message: 'Database not connected' });
      });
    }
    return (new Promise((resolve, reject) => {
      this.db.query(query, params || [], (error, results) => {
        if (error) {
          reject(this.handleDbError(error));
        } else {
          resolve(results);
        }
      });
    }));
  }
  getDb() {
    return (this.db);
  }

  private handleDbError(error): HttpResponse {
    logger.error("Database request failed:", error);
    return (httpCodes.INTERNAL_ERROR);
  }
}

let database = new Database();

export default database;