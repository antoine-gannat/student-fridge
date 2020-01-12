import * as shell from 'shelljs';
import * as path from 'path';
import * as fs from 'fs';
import conf from './declarations/config';

export function deleteFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.unlink(path.join(__dirname, '..', filePath), (err) => {
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
        // create product folder path
        const staticFilePath = path.join(__dirname, '..', conf.productImageFolder + "/");
        // add the filename to the path
        const fileName = new Date().getTime() + fileExtension;
        if (!fs.existsSync(staticFilePath))
            shell.mkdir('-p', staticFilePath);
        let fullLocation = staticFilePath + '/' + fileName;
        saveFile(file, fullLocation).then(() => {
            resolve(conf.productImageFolder + '/' + fileName);
        }, function (error) {
            reject(error);
        });
    }));
}
