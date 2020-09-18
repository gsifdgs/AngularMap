
const DB = require('./db')
const express = require('express');
const app = express();
const hasha = require('hasha');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const TOKEN_SECRET_KEY = 'secret_key';
const getIdFromReq = (req) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        throw new Error('id is not valid')
    }
    return id
}
const checkAuthentication = async (req, res, next) => {
    console.log(req.cookies)
    if(!req.cookies.userCookie) {
        return res.status(401).json({success: false, message: 'unauthenticated'})
    }
    const cookie = req.cookies.userCookie;
    try {
        const decoded = jwt.verify(cookie, TOKEN_SECRET_KEY)
        console.log('decoded', decoded)
        next();
        
    } catch (error) {
        return res.status(401).json({success: false, message: 'unauthenticated'})
    }
}
app.get('/api/checkauthentication', checkAuthentication, (req, res, next) => {
    res.json({})
})
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
        const id = getIdFromReq(req);
        const text = `SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point" WHERE "id"= $1`;
        const values = [id];
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

app.post('/api/point', async (req, res, next) => {
    try {
        // console.log(req.body)
        const name = req.body.name;
        const x = req.body.x;
        const y = req.body.y;
        const type = req.body.type;
        const description = req.body.description;
        const active = req.body.active;
        const text = `INSERT INTO point (name, geom, type, description, active) VALUES($1, st_setsrid(st_point($2, $3), 4326) ,$4 , $5, $6) RETURNING *`
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
        const paramId = getIdFromReq(req)
        const name = req.body.name;
        const x = req.body.x;
        const y = req.body.y;
        const type = req.body.type;
        const description = req.body.description;
        const active = req.body.active;
        const text = `UPDATE point SET name=$1, geom=(st_setsrid(st_point($2, $3), 4326)), type=$4, description=$5, active=$6 WHERE id=$7`;
        const values = [name, x, y, type, description, active, paramId];
        const result = await DB.client.query(text, values);
        res.status(200).json(result.rows);
    } catch (error) {
        // console.log(error);
        res.status(400).json(error);
    }
})
app.delete('/api/point/:id', async (req, res, next) => {
    try {
        const paramId = getIdFromReq(req)
        const text = `DELETE FROM point WHERE id=$1 RETURNING *`;
        const values = [paramId];
        const result = await DB.client.query(text, values);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json(error);
    }
})
app.post('/api/user', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hash_password = (hasha(password).toUpperCase()).toString()
        const text = 'SELECT id, name, email, password FROM "user_log" WHERE "email"= $1 AND "password"= $2';
        const values = [email, hash_password];
        const result = await DB.client.query(text, values);
        if (result.rows.length !== 1) {
            throw new Error('Account Not Found');
        }
        const token = jwt.sign({
            id: result.rows[0].id,
            email: email,
        }, TOKEN_SECRET_KEY,
            { expiresIn: "1h" });
        const options = {
            maxAge: 1000 * 60 * 60, // would expire after 60 minutes
            httpOnly: false, // The cookie only accessible by the web server
            signed: false // Indicates if the cookie should be signed
        }
        // res.cookie('userCookie', 'values', options)
        return res.status(200)
            .cookie('userCookie', token, options)
            .json({ message: 'success' })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            code: 'NotFound'
        });
    }
});
module.exports = app
