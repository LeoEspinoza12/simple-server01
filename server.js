const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css"
};


// console.log(mimeTypes)


http.createServer(function(req, res){
  let uri = url.parse(req.url).pathname;
  let fileName = path.join(process.cwd(), unescape(uri));
  // console.log()
  console.log('Loading' + uri);
  let stats;
  
  try { 
    stats = fs.lstatSync(fileName);
    console.log('it worked')
  } catch(e){
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('404 not found\n');
    res.end();
    return
  }

  if(stats.isFile()){
    var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]]
    res.writeHead(200, {'Content-type': mimeType});

    var fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
  } else if(stats.isDirectory()){
    console.log('is directory')
    res.writeHead(302, {
      'Location': 'index.html'
    });
    res.end();
  } else {
    console.log('nada a toda')
    res.writeHead(500, {'Content-type':'text/plain'});
    res.write('500 Internal Error\n');
    res.end()
  }
}).listen(3000)


// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



