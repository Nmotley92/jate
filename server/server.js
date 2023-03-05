const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
