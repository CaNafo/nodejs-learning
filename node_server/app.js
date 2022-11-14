const http = require("http");
const fs = require("fs");

const rqListener = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");

  switch (url) {
    case "/":
      res.write("<h1>Enter message<h1/>");
      res.write(
        "<form action='/message' method='POST'> <input type='text' name='message'/> <button type='submit'>Submit</button></form/>"
      );
      break;
    case "/message":
      if (method === "POST") {
        res.write("<h1>TEST</h1>");
        fs.writeFileSync("message.txt", "DUMMY");
        res.statusCone = 302;
        res.setHeader("Location", "/");
      }
      break;
  }
  console.log("🚀 ~ file: app.js ~ line 4 ~ rqListener ~ req", req.url);
  console.log("🚀 ~ file: app.js ~ line 4 ~ rqListener ~ req", req.method);
  console.log("🚀 ~ file: app.js ~ line 4 ~ rqListener ~ req", req.headers);

  res.write("</html>");
  res.end();
};

const server = http.createServer(rqListener);

server.listen(3000);
