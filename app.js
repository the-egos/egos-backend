const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hellow world???? !!!')
})

app.listen(port, () => {
  console.log('헤헤헤헤 백엔드 시작볼까~,', port);
})

