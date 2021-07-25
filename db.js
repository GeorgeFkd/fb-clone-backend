const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "facebook",
});

// for some reason cant have types here

module.exports.query = function (text, values) {
    return pool.query(text, values);
};

module.exports.poolDB = pool;
