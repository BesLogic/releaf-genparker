// change name of all files in the directory
const fs = require('fs');

const dir = './font';
// get all files in the directory
fs.readdir(dir, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    // loop through all files
    files.forEach(file => {
        // get the old file name
        const oldPath = `${dir}/${file}`;
        // get the new file name
        const fileName = file.replace('-', '_').toLocaleLowerCase();

        const newPath = `${dir}/${fileName}`;
        // rename the file
        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`${oldPath} renamed to ${newPath}`);
        });
    });
});