const sequelize = require('../utils/connection');
require("../models/Actor");
require("../models/Director");
require("../models/Genre");
require("../models/Movie");

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        // funciones de create...

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();