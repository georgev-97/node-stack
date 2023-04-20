const fs = require("node:fs");

fs.readFile("./node-7.json", { encoding: "utf8" }, (data, error) => {
  if (error) {
    console.error(error);
    return;
  }

  const jsonData = JSON.parse(data);
  console.log(jsonData);
});
