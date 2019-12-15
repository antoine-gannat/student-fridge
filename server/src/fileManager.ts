import * as path from 'path';
import * as fs from 'fs';
import conf from './declarations/config';

export function deleteFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.unlink(conf.uploadFolder + filePath, (err) => {
            if (err)
                reject(err);
            else
                resolve(filePath + " deleted successfully");
        });
    });
}

import shell from 'shelljs';

const FILE_FORMAT_ALLOWED = ['.jpg', '.png', '.jpeg']

function securityChecks(file) {
    const fileExtension = path.extname(file.name).toLowerCase();
    // check if the file extension is allowed
    if (!FILE_FORMAT_ALLOWED.find((extension) => extension === fileExtension)) {
        return (false);
    }
    return (true)
}

function saveFile(file, uploadLocation) {
    let uploadFile = file;

    return new Promise(function (resolve, reject) {
        uploadFile.mv(uploadLocation, function (err) {
            if (err) {
                console.log("upload failed", err);
                reject("Upload failed");
                return;
            }
            resolve("File saved");
        });
    });
}

export function uploadFile(file) {
    return (new Promise(function (resolve, reject) {
        if (!securityChecks(file)) {
            reject("Security checks not passed");
            return;
        }
        // generate upload location
        const fileExtension = path.extname(file.name).toLowerCase();
        var uploadLocation = "/products/";

        if (!fs.existsSync(conf.uploadFolder + uploadLocation))
            shell.mkdir('-p', conf.uploadFolder + uploadLocation);
        // create the upload location
        uploadLocation += "/" + new Date().getTime() + fileExtension;
        saveFile(file, conf.uploadFolder + uploadLocation).then(function (success) {
            resolve(uploadLocation);
        }, function (error) {
            reject(error);
        });
    }));
}
