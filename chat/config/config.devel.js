let config = module.exports = {};

config.env      = "devel";
config.hostname = "localhost";
config.secret   = "allyourbasearebelongtous";

config.mongodb = {
    url: "mongodb://localhost:27017/skal",
};

config.websocket = {
    port: 3001,
    host: "localhost"
};

config.crypto = {
    saltRounds: 10
};
