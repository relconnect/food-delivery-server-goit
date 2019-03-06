const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const saveUser = user => {
  // получить файл с юзером
  // найти путь папки users
  // сохранить туда файл
};

const signUpRoute = (request, response) => {
  // Взять данные что пришли

  if (request.method === "POST") {
    let body = "";
    console.log(request);
    request.on("data", function(data) {
      body += data;

      console.log("Incoming data!!!!");
      console.log(body);
    });

    request.on("end", function() {
      let userData = JSON.parse(body);
      const { username } = userData;

      console.log(username);

      fs.writeFile(
        path.join(__dirname, "../../db/users/", `${username}.json`),
        body,
        err => {
          if (err) throw err;

          console.log("The file has been created!");
        }
      );
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ user: userData, status: "success" }));
      response.end();
    });
  }

};

module.exports = signUpRoute;
