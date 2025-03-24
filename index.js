const BufferManage = require('./src/fs');
const fsinfo = require('./src/fsinf');

class fileStream {
    constructor(req, buffer,folderName) {
        this.req = req;
        this.buffer = buffer;
        this.filepth = '';
        this.folderName=folderName || 'ddiv'
    }

    async buffersend() {
        if (this.req && this.buffer) {
            const file = new BufferManage(this.req, this.buffer,this.folderName);
            const fileinformation = await file.FunctionbufferManage(); // Ensure this returns the correct value
            this.filepth = fileinformation.filepath;
            return fileinformation; // Return the result
        } else {
            return { error: "Request or buffer is missing" };
        }
    }

    async getFileInfo() {
        const filein = new fsinfo(this.filepth);
        return await filein.displayFileInfo(); // Correctly call the method to get file info
    }
}

module.exports = fileStream;
