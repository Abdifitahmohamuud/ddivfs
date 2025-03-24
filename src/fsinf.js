
const path = require('path');
const fs = require('fs');

class fsinfo {
    constructor(fileLocation) {
        this.fileLocation = fileLocation; // Correct assignment
    }

    displayFileInfo() {
        const location = this.fileLocation;
        return new Promise((resolve, reject) => {
            fs.stat(location, (error, state) => {
                if (error) {
                    reject('Error:', error);
                }

                let fileInformation = {
                    name: path.basename(location),
                    size: state.size,
                    
                };
                resolve(fileInformation);
            });
        });
    }
}

module.exports = fsinfo;
