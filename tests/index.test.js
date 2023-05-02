const { app, PORT } = require('../index');
const request = require('supertest');
const axios = require('axios');

describe('PORT', function () {
    it('should be a number for PORT', function () {
        expect(typeof PORT).toBe('number')
    });
    it('PORT to be 8000 on development', () => {
        expect(PORT).toBe(8000);
    });

});

describe('GET /', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /capsules', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/capsules')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/capsules')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});

const functionWithError = param => {
    throw new Error()
}
describe('GET /capsules/*', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/capsules/*')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/capsules/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Serial Value should return TRUE as a boolean', (done) => {
        axios.get('http://localhost:8000/capsules/serial/C103')
            .then(function (response) {
                console.log('Response.data ->', response.data);
                if (response.data.capsule) {
                    let serialValue = response.data.capsule.serial;
                    expect(Boolean(response.data.capsule.serial)).toBe(true, done);
                } else {
                    console.log('should run error----');
                    expect(Boolean(response.data.capsule)).toBe(true, done);
                }
            })
            .catch(function (error) {
                console.log('error here', error);
                expect(error).toBe(false, done);
            })
    });
    it('Capsule Length should return as a message', () => {
        axios.get('http://localhost:8000/capsules/serial/C99')
            .then(function (response) {
                console.log("Response ->", response.data);
                expect(response.data.message).toBe('Capsule not found, Please try again')

            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});

describe('GET /company', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/company')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/company')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /cores', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/cores')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/cores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /cores/*', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/cores/*')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/cores/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Serial Value should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/cores/serial/Merlin1A')
            .then(function (response) {
                console.log('Serial Value ->', serialValue);
                let serialValue = response.data.capsule.serial;
                expect(Boolean(serialValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Capsule Length should return as a message', () => {
        axios.get('http://localhost:8000/cores/serial/Merlin1000')
            .then(function (response) {
                console.log("Response ->", response.data);
                expect(response.data.message).toBe('Core not found, Please try again')

            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});
describe('GET /crew', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/crew')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/crew')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /dragons', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/dragons')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/dragons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});

describe('GET /dragons/*', function () {
    it('Serial Value for dragons should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/dragons/Dragon 1')
            .then(function (response) {
                let nameValue = response.data.dragon.name;
                expect(Boolean(nameValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Dragon Length should return as a message', () => {
        axios.get('http://localhost:8000/dragons/serial/C99')
            .then(function (response) {
                console.log("Response ->", response.data);
                expect(response.data.message).toBe('Dragon not found, Please try again')
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});
describe('GET /landpads', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/landpads')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/landpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});

describe('GET /landpads/*', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/landpads/*')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/landpads/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Name Value for Landpads should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/landpads/name/LZ-1')
            .then(function (response) {
                let nameValue = response.data.landpads.name;
                expect(Boolean(nameValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Landpads Length should return as a message', () => {
        axios.get('http://localhost:8000/landpads/id/blahblahblah')
            .then(function (response) {
                console.log("Response ->", response.data);
                expect(response.data.message).toBe('Capsule not found, Please try again')

            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});
describe('GET /launches', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/launches')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});

describe('GET /launches/*', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/launches/*')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/launches/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Name Value for Launches should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/launches/name/FalconSat')
            .then(function (response) {
                let nameValue = response.data.launches.name;
                expect(Boolean(nameValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Launches Length should return as a message', () => {
        axios.get('http://localhost:8000/launches/id/blahblahblah')
            .then(function (response) {
                console.log("Response ->", response.data);
                expect(response.data.message).toBe('Capsule not found, Please try again')
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});
describe('GET /launchpads', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/launchpads')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/launchpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /launchpads/*', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/launchpads/*')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/launchpads/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Name Value should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/launchpads/region/California')
            .then(function (response) {
                let nameValue = response.data.launchpads.name;
                expect(Boolean(nameValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Landpads Length should return as a message', () => {
        axios.get('http://localhost:8000/launchpads/id/blahblahblah')
            .then(function (response) {
                console.log("Response ->", response.data);
                expect(response.data.message).toBe('Capsule not found, Please try again')
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});
describe('GET /payloads', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/payloads')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/payloads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /roadster', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/roadster')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/roadster')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /rockets', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/rockets')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/rockets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /ships', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/ships')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/ships')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /starlink', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/starlink')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/starlink')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});
describe('GET /history', function () {
    it('response with 200', (done) => {
        request(app)
            .get('/history')
            .expect(200, done);
    });

    it('Should respond with JSON', () => {
        request(app)
            .get('/history')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    });

});

