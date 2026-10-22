const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp',
  '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff':'font/woff', '.woff2':'font/woff2',
  '.ttf':'font/ttf', '.mp3':'audio/mpeg', '.mp4':'video/mp4', '.webmanifest':'application/manifest+json'
};
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (pathname === '/healthz') {
    res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
    return res.end('ok');
  }
  const relative = pathname.replace(/^\/+/, '');
  const file = path.resolve(root, relative || 'index.html');
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403); return res.end('Forbidden');
  }
  fs.stat(file, (err, stat) => {
    if (!err && stat.isFile()) return send(file);
    // SPA routes fall back to index.html; missing static assets return 404.
    if (!path.extname(pathname) || pathname.endsWith('/')) return send(path.join(root, 'index.html'));
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    res.end('This file was not included in the captured website: ' + pathname);
  });
  function send(filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(500); return res.end('Could not read file'); }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(filePath).toLowerCase()] || (path.basename(filePath) === 'config' ? 'application/javascript; charset=utf-8' : 'application/octet-stream'),
        'Cache-Control':'no-cache'
      });
      res.end(data);
    });
  }
});
const port = Number(process.env.PORT || 4173);
const host = '0.0.0.0'; // Required for Render and other container hosts.
server.listen(port, host, () => console.log(`SREGRR55 recovered frontend listening on ${host}:${port}`));
