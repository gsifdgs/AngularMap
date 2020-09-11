const { Client } = require('pg');
const connectionString = "postgres://postgres:postgres@localhost:5400/TestDatabase";
const opt = {
    connectionString: connectionString
}

const client = new Client(opt);

module.exports = {client: client, Client: Client}
//setsrid  makepoint stezgeojson