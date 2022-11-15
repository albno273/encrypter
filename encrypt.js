const fs = require('fs');
const cryptoJs = require('crypto-js');

const encrypt = () => {
  fs.readFile('./.env', { encoding: 'utf8' }, (err, file) => {
    const lines = file.split('\n');
    let encrypted = '';
    const key = fs.readFileSync('./.key', { encoding: 'utf8' }).trim();

    if (!key) {
      console.error('Key is undefined.');
      return;
    }

    lines.forEach((line) => {
      if (line !== '') {
        const items = line.split('=');
        const encryptedValue = cryptoJs.AES.encrypt(items[1], key);
        encrypted += `${items[0]}=${encryptedValue}\n`;
      }
    });

    fs.writeFileSync('./.env.encrypted', encrypted);
  });
};

encrypt();
