const fs = require('fs');
const path = require('node:path');
let data = '';
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readableStream.on('data', chunk => data += chunk);
readableStream.on('end', () => {
  console.log(data);
});
