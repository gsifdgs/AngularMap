
const DB = require('./db')
const express = require('express');

DB.client.connect()
const app = express();
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.get('/api/point', async (req, res, next) => {
    try {
        const text = 'SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point"';
        const result = await DB.client.query(text);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json(error);
    }
});
app.get('/api/point/:id', async (req, res, next) => {
    try {
        const text = `SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point" WHERE "id"= $1 `;
        const values = [req.params.id];
        const result = await DB.client.query(text, values);
        if (result.rows.length === 1) {
            return res.status(200).json(result.rows[0]);
        } else {
            throw new Error('Bulunamadı');
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            code: 'NotFound'
        });
    }
});
// app.get('/api/point/search', async (req, res, next) => {
//     try {
//         const type = req.body.type;
//         const result = await DB.client.query(`SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point" WHERE "type"='${type}'`);
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
        const text = `INSERT INTO point (name, geom, type, description, active) VALUES($1,
        st_setsrid(st_point($2, $3), 4326) ,$4 , $5, $6) RETURNING *`
        const values = [name, x, y, type, description, active];
        const result = await DB.client.query(text, values);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})
app.put('/api/point/:id', async (req, res, next) => {
    try {
        const name = req.body.name;
        const x = req.body.x;
        const y = req.body.y;
        const type = req.body.type;
        const description = req.body.description;
        const active = req.body.active;
        const text = `UPDATE point SET name=$1, geom=(st_setsrid(st_point($2, $3), 4326)), 
        type=$4, description=$5, active=$6 WHERE id=$7`;
        const values = [name, x, y, type, description, active, req.params.id];
        const result = await DB.client.query(text, values);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})
app.delete('/api/point/:id', async (req, res, next) => {
    try {
        const text = `DELETE FROM point WHERE id=$1 RETURNING *`;
        const values = [req.params.id];
        const result = await DB.client.query(text, values)
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})
app.listen(4000, () => {
    console.log('Server is running.. on Port 4000');
});