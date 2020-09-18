const app = require("../app");
const DB = require('../db')
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('api test', () => {

    it('should test api/point', async () => {

        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: [
                {
                    id: 1,
                    name: 'test',
                    x: 0,
                    y: 0
                }
            ]
        }))

        const res = await request(app).get('/api/point');
        expect(callback.calledWith('SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point"')).to.equal(true)
        callback.restore()

        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')
        expect(res.body).to.have.length(1)
        expect(res.body[0].id).to.equal(1)
        expect(res.body[0].name).to.equal('test')

    })
    it('should test api/point/11', async () => {

        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: [
                {
                    id: 1,
                    name: 'test',
                    x: 0,
                    y: 0
                }
            ]
        }))

        const res = await request(app).get('/api/point/11');
        expect(callback.calledWith(
            'SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point" WHERE "id"= $1',
            [11]
        )).to.equal(true)
        callback.restore()

        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')

        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('x')
        expect(res.body).to.have.property('y')

    })
    it('should test not found api/point/11', async () => {

        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: []
        }))

        const res = await request(app).get('/api/point/21');
        expect(res.status).to.equal(400)
        expect(callback.calledWith(
            'SELECT id, name, type, description, active, st_x(geom) x,  st_y(geom) y FROM "point" WHERE "id"= $1',
            [21]
        )).to.equal(true)
        callback.restore()

        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')

        expect(res.body).to.have.property('error')
        expect(res.body).to.have.property('code')
        expect(res.body).to.have.property('code')
        // expect(res.body).to.have.property('id')
        // expect(res.body).to.have.property('name')
        // expect(res.body).to.have.property('x')
        // expect(res.body).to.have.property('y')
    })

    it('should test insert api/point', async () => {
        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: [{
                id: 1,
                name: 'deneme',
                description: 'deneme',
                x: 1,
                y: 1
            }]
        }))

        const res = await request(app).post('/api/point').send({
            name: 'deneme',
            description: 'deneme',
            x: 1,
            y: 1
        });
        callback.restore()

        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')
        expect(res.status).to.equal(200)
        expect(res.body).to.deep.equal([{
            id: 1,
            name: 'deneme',
            description: 'deneme',
            x: 1,
            y: 1
        }])
        // expect(res.body).to.have.property('id')
        // expect(res.body).to.have.property('name')
        // expect(res.body).to.have.property('geom')
        // expect(res.body).to.have.property('description')
        // expect(res.body).to.have.property('active')
    })

    it('should test update api/point/1', async () => {

        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: [
                {
                    id: 1,
                    name: 'test',
                    x: 0,
                    y: 0,
                    type: 'bridge',
                    description: 'testingDescription',
                    active: true
                }
            ]
        }))

        const res = await request(app).put('/api/point/1').send({
            name: 'test',
            x: 0,
            y: 0,
            type: 'bridge',
            description: 'testingDescription',
            active: true
        });
        expect(callback.calledWith(
            `UPDATE point SET name=$1, geom=(st_setsrid(st_point($2, $3), 4326)), type=$4, description=$5, active=$6 WHERE id=$7`,
            ['test', 0, 0, 'bridge', 'testingDescription', true, 1]
        )).to.equal(true)
        callback.restore()

        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')
    })
    it('should test update error api/point/1', async () => {
        const res = await request(app).put('/api/point/asdfasdf').send({
            name: 'test',
            x: 0,
            y: 0,
            type: 'bridge',
            description: 'testingDescription',
            active: true
        });


        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')

        expect(res.status).to.equal(400)

    })
    it('should test delete api/point/1', async () => {

        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: []
        }))

        const res = await request(app).delete('/api/point/1');
        expect(callback.calledWith(
            `DELETE FROM point WHERE id=$1 RETURNING *`,
            [1]
        )).to.equal(true)
        callback.restore()

        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')
        // expect(res.body).to.have.property('id')
        // expect(res.body).to.have.property('name')
        // expect(res.body).to.have.property('geom')
        // expect(res.body).to.have.property('description')
        // expect(res.body).to.have.property('active')
    })
    it('should test user.post api/user', async () => {

        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: [{
                id: 40,
                name: 'admin',
                email: 'admin@gmail.com',
                password: 'B109F3BBBC244EB82441917ED06D618B9008DD09B3BEFD1B5E07394C706A8BB980B1D7785E5976EC049B46DF5F1326AF5A2EA6D103FD07C95385FFAB0CACBC86'
            }]
        }))

        const res = await request(app).post('/api/user')
            .set('Cookie', 'token=12345667;myApp-other=blah').send({
                email: 'admin@gmail.com',
                password: 'password'
            });
        expect(callback.calledWith(
            'SELECT id, name, email, password FROM "user_log" WHERE "email"= $1 AND "password"= $2'))
            .to.equal(true)

        callback.restore()

        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')
        // console.log('res.header', res.header)
        expect(res.header).to.have.property('set-cookie');
        expect(res.header['set-cookie'][0]).to.be.a('string');
        expect(res.header['set-cookie'][0]).contains('userCookie=');
        // console.log(res.header['set-cookie'][0]);
        // expect(res.body).to.have.property('id')
        // expect(res.body).to.have.property('name')
        // expect(res.body).to.have.property('email')
        // expect(res.body).to.have.property('password')

    })


    it('should test user error api/user', async () => {

        const callback = sinon.stub(DB.client, 'query');
        callback.returns(Promise.resolve({
            rows: []
        }))

        const res = await request(app).post('/api/user').send({
            email: '1122admin@gmail.com',
            password: 'password'
        });
        // expect(callback.calledWith(
        //     'SELECT id, name, email, password FROM "user_log" WHERE "email"= $1 AND "password"= $2'))

        callback.restore()
        // console.log(res.header)
        expect(res.header).to.have.property('access-control-allow-origin')
        expect(res.header).to.have.property('access-control-allow-headers')
        expect(res.header).to.have.property('access-control-allow-methods')
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('error')
    })

    // it('should test user authentication api/checkauthentication', async () => {
    //     // const callback = sinon.stub(DB.client, 'query');
    //     // callback.returns(Promise.resolve({
    //     //     rows: [{
    //     //         id: 40,
    //     //         email: 'admin@gmail.com',
    //     //     }]
    //     // }))
    //     const res = await request(app).get('/api/checkauthentication')
    //         .set('Cookie', '')

    //     console.log(res.body)
    //     expect(res.header).to.have.property('access-control-allow-origin')
    //     expect(res.header).to.have.property('access-control-allow-headers')
    //     expect(res.header).to.have.property('access-control-allow-methods')
    //     // expect(res.header).to.have.property('set-cookie');
    //     // expect(res.header['set-cookie'][0]).to.be.a('string');
    //     // expect(res.header['set-cookie'][0]).contains('userCookie=');
    // })

    // it('should test user not authenticated error api/checkauthentication', async () => {
    //     // const callback = sinon.stub(DB.client, 'query');
    //     // callback.returns(Promise.resolve({
    //     //     rows: []
    //     // }))
    //     const res = await request(app).get('/api/checkauthentication')
    //         // .set('Cookie', null)
    //     expect(res.header).to.have.property('access-control-allow-origin')
    //     expect(res.header).to.have.property('access-control-allow-headers')
    //     expect(res.header).to.have.property('access-control-allow-methods')
    //     expect(res.status).to.equal(401)
    //     // expect(res.body).to.have.property('error')
    // })
})


