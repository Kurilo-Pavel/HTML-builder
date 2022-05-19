const fs = require('fs');
const path = require('node:path');
const readline = require('node:readline');
const {stdin: input, stdout: output} = require('node:process');
const rl = readline.createInterface({input, output});

const filePath = path.join(__dirname, 'text.txt');

const writeableStream = fs.createWriteStream(filePath, err => {
  if (err) {
    console.log('Что-то пошло не так:(');
    throw err;
  }
});
writeableStream.on('open', () => {
  console.log('Добро пожаловать');
  console.log('Файл создан!!!');
  console.log('Оставьте свой комментарий');
});

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Всего хорошего');
    rl.close();
  } else {
    fs.appendFile(filePath, input + '\n', err => {
      if (err) {
        throw err;
      }
    });
  }
});
rl.on('SIGINT', () => {
  console.log('Bye!!!');
  rl.close();
});