const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

const getFilePath = (filename) => path.join(DATA_DIR, filename);

const readData = async (filename) => {
    try {
        const filePath = getFilePath(filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
};

const writeData = async (filename, data) => {
    try {
        const filePath = getFilePath(filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing to ${filename}:`, error);
        return false;
    }
};

module.exports = { readData, writeData };
