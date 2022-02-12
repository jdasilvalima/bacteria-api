const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Hi There</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

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

//32min
//https://www.youtube.com/watch?v=9zUHg7xjIqQ