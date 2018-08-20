const express = require('express');
const path = require('path');
const fs = require('fs');

const app = new express();

const srcPath = path.resolve(__dirname, 'src');

let version = Date.now();

let watchTimeout;

fs.watch(srcPath, {persistent: true, recursive: true}, () => {
  if (watchTimeout) {
    clearTimeout(watchTimeout);
  }
  watchTimeout = setTimeout(() => {
    version = Date.now();
    console.info('UPDATE', version);
  }, 100)
});

app.post('/version', (req, res) => {
  res.json(version);
});

app.use('/', express.static(srcPath));

const port = 3000;

app.listen(port, () => {
  console.log(`Website: http://localhost:${port}`)
})
