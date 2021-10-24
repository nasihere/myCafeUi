const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  ca: fs.readFileSync('ca.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8080);
// const express = require('express');
// const path = require('path')
// const port = 8080;
// const app = express();

// app.use(express.static('./dist/mycafe-ui'))
// app.set('view engine', 'pug');

// app.get('/*', (req, res) => {
//     res.sendFile('/dist/mycafe-ui/index.html',{root:__dirname})
// });


// app.listen(port, () => {
//     console.log("Server is listening on port "+port);
// });