module.exports = (req, res) => {
  if (req.url === "/") {
    //send the form to the page
    res.write(formTemp);
    res.end();
  } else if (req.url === "/api/v1/shop" && req.method === "POST") {
    //collect form request data
    collectRequestData(req, result => {
      const {
        message
      } = result;
      //check if the output directory and message.txt exist
      //fs.access is used so as to not block the code. fs.access is async
      fs.access(path.join(__dirname, "output", "message.txt"), (err) => {
        if (err) {
          console.info("The file does not exits.");
          //make the directory
          fs.mkdir(path.join(__dirname, "output"), {}, err => {
            if (err) throw err;
            //write message to file
            fs.writeFile(path.join(__dirname, "output", "message.txt"), message, "utf-8", err => {
              if (err) throw err;
              //send success page
              fs.readFile(path.join(__dirname, "public", "success.html"), "utf-8", (err, data) => {
                if (err) throw err;
                res.end(data)
              });
            });
          });
        } else {
          //If folder and file exit, append text 
          console.info("File exits");
          fs.appendFile(path.join(__dirname, "output", "message.txt"), `\n${message}`, "utf-8", err => {
            err && err;
            //send success page
            fs.readFile(path.join(__dirname, "public", "success.html"), "utf-8", (err, data) => {
              if (err) throw err;
              res.end(data);
            });
          });
        }
      });
    });
  } else {
    //display page error if page not found
    res.writeHead(404, {
      "Content-type": "text/html"
    });

    fs.readFile(
      path.join(__dirname, "public", "error-page.html"),
      "utf-8",
      (err, data) => res.end(data));
  }
}