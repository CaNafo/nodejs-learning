const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<h1>Enter message<h1/>");
    res.write(
      "<form action='/message' method='POST'> <input type='text' name='message'/> <button type='submit'>Submit</button></form/>"
    );
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log("🚀 ~ file: app.js ~ line 21 ~ req.on ~ chunk", chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Location", "/");
    res.write("<html>");
    res.write("<h1>TEST</h1>");

    res.statusCode = 302;
    return res.end();
  }
};

module.exports = requestHandler;