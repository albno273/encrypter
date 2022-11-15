const fs = require('fs');
const cryptoJs = require('crypto-js');

const decrypt = () => {
  fs.readFile('./.env.encrypted', { encoding: 'utf8' }, (err, file) => {
    const lines = file.split('\n');
    let decrypted = '';
    const key = fs.readFileSync('./.key', { encoding: 'utf8' }).trim();

    if (!key) {
      console.error('Key is undefined.');
      return;
    }

    lines.forEach((line) => {
      if (line !== '') {
        const items = line.split(RegExp(/(?<=^[^=]+?)=/));
        const decryptedValue = cryptoJs.AES.decrypt(items[1], key).toString(cryptoJs.enc.Utf8);
        decrypted += `${items[0]}=${decryptedValue}\n`;
      }
    });

    fs.writeFileSync('./.env', decrypted);
  });
};

decrypt();
