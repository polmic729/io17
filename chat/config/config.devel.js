let config = module.exports = {};

config.env      = "devel";
config.hostname = "localhost";

config.mongodb = {
    url: "mongodb://localhost:27017/users",
};

config.websocket = {
    port: 3001,
    host: "localhost"
};


