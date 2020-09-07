
const DB = require('./db')
const express = require('express');

DB.client.connect()
const app = express();
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/api/point', async (req, res, next) => {
    try {
        const result = await DB.client.query('SELECT id, name, type, st_x(geom) x,  st_y(geom) y FROM "point"')
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json(error);
    }
});
app.post('/api/point', async (req, res, next) => {
    try {
        const name = req.body.name;
        const [x, y] = req.body.geom;
        const type = req.body.type;
        // console.log('name', name);
        // console.log('geom', geom);
        
        const result = await DB.client.query(`INSERT INTO point (name, geom, type) VALUES('${name}',
            st_setsrid(st_point(${x}, ${y}), 4326), '${type}') RETURNING *`)
        // res.status(200).json({success: true, name});
        // console.log('GELDI', result)
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
   })
app.listen(4000, () => {
    console.log('Server is running.. on Port 4000');
});