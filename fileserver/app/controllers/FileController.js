const path = require('path');
const fs = require('fs');

class FileController {
    async getImage(req, res, next) {
        if (req.params.slug != '') {
            const dirPath = path.join(__dirname, '..', '..', 'Storage', 'video', 'img');
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // find the file that starts with the slug
                const file = files.find(file => file.startsWith(req.params.slug));
                if (file) {
                    // construct the full file path
                    const filePath = path.join(dirPath, file);
                    // send the file
                    res.sendFile(filePath);
                } else {
                    // handle the case when the file is not found
                    res.status(404).send('File not found');
                }
            });
        }
    }

    async getVideo(req, res, next) {
        if (req.params.slug != '') {
            const dirPath = path.join(__dirname, '..', '..', 'Storage', 'video','vid');
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // find the file that starts with the slug
                const file = files.find(file => file.startsWith(req.params.slug));
                if (file) {
                    // construct the full file path
                    const filePath = path.join(dirPath, file);
                    // send the file
                    res.sendFile(filePath);
                } else {
                    // handle the case when the file is not found
                    res.status(404).send('File not found');
                }
            });
        }
    }

    async getChannelBanner(req, res) {
        if (req.params.slug != '') {
            const dirPath = path.join(__dirname, '..', '..', 'Storage', 'channel', 'banner');
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // find the file that starts with the slug
                const file = files.find(file => file.startsWith(req.params.slug));
                if (file) {
                    // construct the full file path
                    const filePath = path.join(dirPath, file);
                    // send the file
                    res.sendFile(filePath);
                } else {
                    // handle the case when the file is not found
                    res.status(404).send('File not found');
                }
            });
        }
    }

    async getChannelAvatar(req, res) {
        if (req.params.slug != '') {
            const dirPath = path.join(__dirname, '..', '..', 'Storage', 'channel', 'avatar');
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // find the file that starts with the slug
                const file = files.find(file => file.startsWith(req.params.slug));
                if (file) {
                    // construct the full file path
                    const filePath = path.join(dirPath, file);
                    // send the file
                    res.sendFile(filePath);
                } else {
                    // handle the case when the file is not found
                    res.status(404).send('File not found');
                }
            });
        }
    }


}

module.exports = new FileController();