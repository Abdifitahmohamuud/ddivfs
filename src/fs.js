const path = require('path');
const fs = require('fs');

class BufferManage {
    constructor(req, buffer,folderName) {
        this.req = req;
        this.buffer = buffer;
        this.folderName=folderName || 'ddiv'
    }

    FunctionbufferManage() {
        const req = this.req;
        const buffer = this.buffer;
        const folderName = this.folderName;
        const rootPath = path.resolve(__dirname, "./../");
        const uploadDir = path.join(rootPath, folderName);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('multipart/form-data')) {
            return { error: 'Content-Type must be multipart/form-data' };
        }

        const boundaryMatch = contentType.match(/boundary=(.+)/);
        if (!boundaryMatch) {
            return { error: 'Boundary not found in Content-Type header' };
        }

        const boundary = '--' + boundaryMatch[1];
        const bodyStr = buffer.toString('latin1');
        const parts = bodyStr.split(boundary);

        let filePart = null;
        for (let part of parts) {
            if (part.includes('Content-Disposition: form-data') && part.includes('filename=')) {
                filePart = part;
                break;
            }
        }

        if (!filePart) {
            return { error: 'No file part found' };
        }

        filePart = filePart.trim();
        const separator = '\r\n\r\n';
        const index = filePart.indexOf(separator);

        if (index === -1) {
            return { error: 'Invalid multipart format' };
        }

        const headersPart = filePart.substring(0, index);
        let fileContentStr = filePart.substring(index + separator.length).replace(/\r\n--$/, '');

        const filenameMatch = headersPart.match(/filename="([^"]+)"/);
        const fileName = filenameMatch ? filenameMatch[1] : Date.now() + '-file';

        const fileBuffer = Buffer.from(fileContentStr, 'latin1');
        const filePath = path.join(uploadDir, fileName);

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, fileBuffer, (err) => {
                if (err) {
                    reject({ error: 'Error saving file' });
                } else {
                 
                    resolve({ filename: fileName, filepath: filePath });
                }
            });
        });
        
    }
     
}

module.exports = BufferManage;
