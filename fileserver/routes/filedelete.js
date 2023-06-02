const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.delete('/video/vid', (req, res) => {
  const folderPath = path.join(__dirname, '../Storage/video/vid');
  const fileName = req.body.fileName; // Tên tệp tin cần xóa

  // Tìm tất cả các tệp tin trong thư mục
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send({ message: 'Internal Server Error' });
    }

    // Tìm tệp tin dựa trên tên duy nhất
    const matchedFiles = files.filter((file) => file.includes(fileName));

    if (matchedFiles.length > 0) {
      matchedFiles.forEach((matchedFile) => {
        const filePath = path.join(folderPath, matchedFile);

        // Xóa tệp tin
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${matchedFile}:`, err);
          } else {
            console.log(`File ${matchedFile} deleted successfully`);
          }
        });
      });

      res.send({ message: 'Files deleted' });
    } else {
      console.log(`File ${fileName} does not exist`);
      res.status(404).send({ message: 'File not found' });
    }
  });
});

router.delete('/video/img', (req, res) => {
    const folderPath = path.join(__dirname, '../Storage/video/img');
    const fileName = req.body.fileName; // Tên tệp tin cần xóa
  
    // Tìm tất cả các tệp tin trong thư mục
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return res.status(500).send({ message: 'Internal Server Error' });
      }
  
      // Tìm tệp tin dựa trên tên duy nhất
      const matchedFiles = files.filter((file) => file.includes(fileName));
  
      if (matchedFiles.length > 0) {
        matchedFiles.forEach((matchedFile) => {
          const filePath = path.join(folderPath, matchedFile);
  
          // Xóa tệp tin
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${matchedFile}:`, err);
            } else {
              console.log(`File ${matchedFile} deleted successfully`);
            }
          });
        });
  
        res.send({ message: 'Files deleted' });
      } else {
        console.log(`File ${fileName} does not exist`);
        res.status(404).send({ message: 'File not found' });
      }
    });
  });

module.exports = router;
