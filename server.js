const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(process.env.PORT || 3000);

console.log('FRONTEND SERVER STARTED. PORT: ', process.env.PORT || 3000);
