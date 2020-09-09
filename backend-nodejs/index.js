
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
        const result = await DB.client.query('SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point"')
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.get('/api/point/:id', async (req, res, next) => {
    try {
        const result = await DB.client.query(`SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point" WHERE "id"='${req.params.id}'`);
        if (result.rows.length === 1) {
            return res.status(200).json(result.rows[0]);
        } else {
            throw new Error('Bulunamadı')
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            code: 'NotFound'
        });
    }
});
// app.get('/api/filter', async (req, res, next) => {
//     try {
//         const result = await DB.client.query(`SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point" WHERE "name"='${req.params.name}'`);
//         if (result.rows.length === 1) {
//             return res.status(200).json(result.rows[0]);
//         } else {
//             throw new Error('Bulunamadı')
//         }
//     } catch (error) {
//         res.status(400).json({
//             error: error.message,
//             code: 'NotFound'
//         });
//     }
// });
app.post('/api/point', async (req, res, next) => {
    try {
        console.log(req.body)
        const name = req.body.name;
        const x = req.body.x;
        const y = req.body.y;
        const type = req.body.type;
        const description = req.body.description;
        const active = req.body.active;
        // console.log('name', name);
        // console.log('geom', geom);
        const result = await DB.client.query(`INSERT INTO point (name, geom, type, description, active) VALUES('${name}',
            st_setsrid(st_point(${x}, ${y}), 4326) ,'${type}' , '${description}', '${active}') RETURNING *`)
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