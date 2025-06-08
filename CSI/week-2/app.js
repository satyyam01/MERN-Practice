const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  const filePath = path.join(__dirname, 'files', query.filename || 'default.txt');

  const filesDir = path.join(__dirname, 'files');
  if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

  // routing
  if (pathname === '/create') {
    if (!query.filename || !query.content) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing filename or content in query');
    }

    fs.writeFile(filePath, query.content, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end('Failed to create file');
      }
      res.writeHead(200);
      res.end(`File '${query.filename}' created successfully.`);
    });

  } else if (pathname === '/read') {
    if (!query.filename) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing filename in query');
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Content of ${query.filename}:\n\n${data}`);
    });

  } else if (pathname === '/delete') {
    if (!query.filename) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing filename in query');
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found or already deleted');
      }
      res.writeHead(200);
      res.end(`File '${query.filename}' deleted successfully.`);
    });

  } else {
    res.writeHead(404);
    res.end('Invalid route. Use /create, /read, or /delete.');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
