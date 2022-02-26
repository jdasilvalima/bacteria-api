const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const bacteriaRouter = require("./routes/bacteriaRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
//ip address at the end + mongo default port

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("succesfullt connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000); //retry until success - do not rely only on docker
    });
};

connectWithRetry();

//to read json body in request
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hi There</h2>");
});

//localhost:3000/api/v1/bacterias
app.use("/api/v1/bacterias", bacteriaRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

//node index.js >>> http://localhost:3000/

// up down dev prod

//create Dockerfile
//create or update docker image with a name : "docker build -t node-app-image ."
//give all docker images : docker image ls
//delete a docker image : docker image rm ...number...
//run image in a container (and give a name to the container): docker run -d --name node-app node-app-image (d for detached mode)
//run image in a container plus right port trafic on our container / left represents trafic coming from outside : docker run -p 3000:3000  -d --name node-app node-app-image (d for detached mode)
//verify the list of docker running : docker ps   //// docker ps -a > to see all containers even those ones not running
//stop or/and delete a docker (with f) : docker rm node-app -f
//can create a docker ignore file

//check file in our docker docker exec -it node-app bash ///// ls for the list ////// exit

//1st bad solution
//When do a modification in the code we have to rebuild the image (speficic to this exemple) >>> not sustainable, see a better solution after
//delete the container : docker rm node-app -fv
//build the image : "docker build -t node-app-image ."
//run image in a container we are creating : docker run -p 3000:3000  -d --name node-app node-app-image

//2nd solution - sync file with our container
//restart node process in order to see modification in the browser => install nodemon (npm install nodemon --save-dev)
//change Docker file CMD
//run image in a container we are creating (-v pathtofolderonlocation:pathtofolderoncontainer): docker run -v C:\Users\jaded\Documents\LAB\NodeJS\:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
//pass env variable (after creating the env file) - express app is listening on 4000 : docker run -v C:\Users\jaded\Documents\LAB\NodeJS\:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image

//liste volume : docker volume ls
//delete volumes : docker volume rm .....   //// docker volume prune

//3rd solution
//create one command to run several dockers
//create docker-compose.yml
//new command line to build the docker compose file (build the image + start the container): docker-compose up -d
//to stop everything : docker-compose down -v
//when  we want to force the build of an image (one we changed the image) : docker-compose up -d --build

//Go to production
//can crete 2 dockerfile or devide the docker-compose file in two
//For dev env (-f = file) : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
//to stop it : docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
//For prod env : docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
//to stop it : docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
//everytime we change our code we have to rebuild the image --build : docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

//nodemon is only usefull for dev env so need to remove it in prod.

//add mongo DB
//we do not customize the image for mongodb so we just take one existing in Docker Hub
//add mongo db in the docker file
//in order to not loose the data in mongo DB after we delete the docker we need to change docker-compose by creating a volume with a name (to keep data)
//connect to mongo client => docker exec -it nodejs-mongo-1 mongo -u "jdslvl" -p "mypassword"
//WARNING do not use -v to not remove the volume when delete the docker (in order to keep the db)=> docker-compose -f docker-compose.yml -f docker-compose.dev.yml down // up -d

//mongoose helps to talk easily to the DB
//update index.js file with mongoose settings
//to know the ip address => docker ps / to know more information : docker inspect nodejs-node-app-1 (has Networks information with IP address)
// docker logs +  dockername
//Be careful => every time a docker stop it changes its IP address.
//=> better to refer to the service name (eg mongo) instead to use the ip address

//Tell to docker to run first Mongo before Node.js => depends_on: - mongo
//start only node-app application => docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps node-app
