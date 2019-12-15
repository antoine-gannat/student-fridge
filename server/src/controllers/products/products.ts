import database from '../../database';
import logger from '../../loggers/logger';
import httpCodes from '../../declarations/httpCodes';
import * as fileManager from '../../fileManager';

export function addProduct(req, res) {
    if (!req.body || !req.body.name || !req.raw || !req.raw.files || req.raw.files.length === 0) {
        res.status(httpCodes.BAD_REQUEST.code).send(httpCodes.BAD_REQUEST.message);
        return;
    }
    const image = req.raw.files[0];
    console.log(req.body, image)
    fileManager.uploadFile(image).then((path) => {
        logger.info("File uploaded to " + path);
        // insert the product in the database
        database.query("INSERT INTO `products`(name, image, expiration_date) VALUE(?,?,?)", [req.body.name, path, req.body.expiratonDate])
            .then(response => {
                res.status(200).send({ message: 'Product added !' })
            }).catch((error) => {
                logger.error(error)
                res.status(httpCodes.INTERNAL_ERROR.code).send({ message: httpCodes.INTERNAL_ERROR.message });
            });
    }).catch((err) => {
        logger.error(err);
        res.status(httpCodes.INTERNAL_ERROR.code).send({ message: httpCodes.INTERNAL_ERROR.message });
    })
}

export function getProducts(req, res) {
    database.query('SELECT * FROM `products` WHERE `expiration_date` >= NOW()').then((response) => {
        res.status(200).send(response);
    }).catch((error) => {
        logger.error(error)
        res.status(httpCodes.INTERNAL_ERROR.code).send({ message: httpCodes.INTERNAL_ERROR.message });
    });
}