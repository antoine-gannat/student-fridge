import * as shell from 'shelljs';
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


const FILE_FORMAT_ALLOWED = ['.jpg', '.png', '.jpeg']

function securityChecks(file) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    // check if the file extension is allowed
    if (!FILE_FORMAT_ALLOWED.find((extension) => extension === fileExtension)) {
        return (false);
    }
    return (true)
}

function saveFile(file, uploadLocation) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(uploadLocation, file.buffer, (err) => {
            if (err) {
                console.log("upload failed", err);
                reject("Upload failed");
                return;
            }
            resolve("File saved");
        })
    });
}

export function uploadFile(file) {
    return (new Promise(function (resolve, reject) {
        if (!securityChecks(file)) {
            reject("Security checks not passed");
            return;
        }
        // generate upload location
        const fileExtension = path.extname(file.originalname).toLowerCase();
        // create the folder path
        var uploadLocation = path.join(__dirname, '..', conf.productImageFolder);

        if (!fs.existsSync(uploadLocation))
            shell.mkdir('-p', uploadLocation);
        // add the filename to the path
        uploadLocation += "/" + new Date().getTime() + fileExtension;
        saveFile(file, uploadLocation).then(() => {
            resolve(uploadLocation);
        }, function (error) {
            reject(error);
        });
    }));
}
