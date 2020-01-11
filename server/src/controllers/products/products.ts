import database from '../../database';
import logger from '../../loggers/logger';
import httpCodes from '../../declarations/httpCodes';
import * as fileManager from '../../fileManager';

export function addProduct(req, res) {
    if (!req.body || !req.body.name || !req.files || req.files.length === 0) {
        res.status(httpCodes.BAD_REQUEST.code).send(httpCodes.BAD_REQUEST.message);
        return;
    }
    const image = req.files[0];
    fileManager.uploadFile(image).then((path) => {
        logger.info("File uploaded to " + path);
        // insert the product in the database
        database.query("INSERT INTO `products`(name, image, expiration_date, user_id) VALUE(?,?,?,?)",
            [req.body.name, path, req.body.expiratonDate, req.user.id])
            .then(response => {
                res.status(200).send({ message: 'Product added !' })
            }).catch((error) => {
                logger.error(error)
                logger.info("Deleting the file just uploaded")
                // on error, delete the uploaded file
                fileManager.deleteFile(path).catch((err) => {
                    logger.error("Failed to delete the uploaded file: ", path, err)
                }).finally(() => {
                    res.status(httpCodes.INTERNAL_ERROR.code).send({ message: httpCodes.INTERNAL_ERROR.message });
                });
            });
    }).catch((err) => {
        logger.error(err);
        res.status(httpCodes.INTERNAL_ERROR.code).send({ message: httpCodes.INTERNAL_ERROR.message });
    })
}

export function getProducts(req, res) {
    database.query('SELECT * FROM `products` WHERE `expiration_date` >= NOW() OR `expiration_date` IS NULL').then((response) => {
        res.status(200).send(response);
    }).catch((error) => {
        logger.error(error)
        res.status(httpCodes.INTERNAL_ERROR.code).send({ message: httpCodes.INTERNAL_ERROR.message });
    });
}