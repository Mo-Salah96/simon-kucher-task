const path = require('path');
const fs = require('fs');


class Utils {
    static inDevelopment() {
        const env = process.env.NODE_ENV || 'development';
        return (env === 'development');
    }

    static getPath(base, file) {
        return path.join(base, file);
    }

    static requireAllInFolder  (dir)  {
        let all = [];
        const files = fs.readdirSync(dir);
        for (let i = 0; i < files.length; i++) {
            const fileDir = path.join(dir, files[i]);
            if (fs.lstatSync(fileDir).isDirectory()) {
                all = all.concat(this.requireAllInFolder(fileDir));
            } else {
                const file = require(fileDir);
                all.push(file)
            }
        }
        return all;
    }
}

module.exports = Utils;
