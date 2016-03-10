import zlib from 'zlib'

export function writeError(msg, res){
  res.writeHead(500, {'Content-Type': 'text/html'})
  res.write('ERROR!');
  res.end();
}

export function redirect(location, res){
  res.writeHead(303, {'Location': location});
  res.end();
}

export function writeNotFound(res){
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('Not Found');
  res.end();
}

export function write(string, type, res){
  zlib.gzip(string, (err, result) => {
    res.writeHead(200, {
      'Content-Length': result.length,
      'Content-Type': type,
      'Content-Encoding': 'gzip'
    });
    res.write(result);
    res.end();
  });
}

export function createPage(html){
  return `
    <!doctype html>
    <html>
    <meta charset="utf-8"/>
    <head>
      <title>React Router Demo</title>
    </head>
    <body>
    <div id="app">${html}</div>
    <script>
    __DATA__ = '¡DATA!';
    </script>
    <script src="http://localhost:8080/js/bundle.js"></script>
    </body>
    </html>
  `;
}