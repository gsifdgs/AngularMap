const app = require("./app");
const DB = require('./db');
DB.client.connect();
app.listen(4000, () => {
    console.log('Server is running.. on Port 4000');
});