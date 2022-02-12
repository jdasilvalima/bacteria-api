const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Hi There !</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

//node index.js >>> http://localhost:3000/

//create Dockerfile
//create or update docker image with a name : "docker build -t node-app-image ."
//give all docker images : docker image ls
//delete a docker image : docker image rm ...number...
//run image in a container (and give a name to the container): docker run -d --name node-app node-app-image (d for detached mode)
//run image in a container plus right port trafic on our container / left represents trafic coming from outside : docker run -p 3000:3000  -d --name node-app node-app-image (d for detached mode)
//verify the list of docker running : docker ps
//stop or/and delete a docker (with f) : docker rm node-app -f
//can create a docker ignore file

//check file in our docker docker exec -it node-app bash ///// ls for the list ////// exit

//1st bad solution
//When do a modification in the code we have to rebuild the image (speficic to this exemple) >>> not sustainable, see a better solution after
//delete the container : docker rm node-app -f
//build the image : "docker build -t node-app-image ."
//run image in a container we are creating : docker run -p 3000:3000  -d --name node-app node-app-image

//2nd solution - sync file with our container
//restart node process in order to see modification in the browser => install nodemon (npm install nodemon --save-dev)
//change Docker file CMD
//run image in a container we are creating (-v pathtofolderonlocation:pathtofolderoncontainer): docker run -v C:\Users\jaded\Documents\LAB\NodeJS\:/app -p 3000:3000 -d --name node-app node-app-image

//45min31 - might enconter some issues if miss a step
//https://www.youtube.com/watch?v=9zUHg7xjIqQ
