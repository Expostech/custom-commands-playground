const date = new Date();
const version = { version: date.toISOString() };

const fs = require('fs');

fs.writeFile('public/version.json', JSON.stringify(version), 'utf8', (error) => {
  if (error) {
    throw new Error(error);
  }
});
