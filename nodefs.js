const fs = require("node:fs");


fs.writeFile('message.txt', 'Hello Node.js', 'utf8', (data,error) => {
    if(error){
        console.error(error);
        return;
    }

    console.log("The file has been written");
}); 
