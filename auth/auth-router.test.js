const server = require('../api/server')
const supertest = require('supertest')

const db =require('../database/dbConfig')

describe('/api/auth',()=>{
    describe(' POST /register', ()=>{
        // beforeEach(async () => {
        //     // trucate or empty the hobbits table
        //     await db("users").truncate();
        // });

        it("should return 201 when passed correct data", async () => {
            const res = await supertest(server)
                .post("/api/auth/register")
                .send({username: new Date(), password: 'max123'})

                expect(res.status).toBe(201)
        });

        it('should return JSON', async ()=>{
            const res = await supertest(server)
                .post("/api/auth/register")
                .send({username: 'max', password: 'max123'})

                expect(res.type).toMatch(/json/i)
        });

        it('should return status 400 when not passing username', async ()=>{
            const res = await supertest(server)
                .post("/api/auth/register")
                .send({name: 'max', password: 'max123'})

                expect(res.status).toBe(400)
        })
        // it return status 500 when not passing password because we need the password to hash it without the password the api will crash
        it('should return status 400 when not passing username', async ()=>{
            const res = await supertest(server)
                .post("/api/auth/register")
                .send({username: 'max', passwordrr: 'max123'})

                expect(res.status).toBe(500)
        })
    })

    describe(' POST /login', ()=>{
        it("should return 200 when passed correct data", async () => {
            const res = await supertest(server)
                .post("/api/auth/login")
                .send({username: 'sami', password: 'pass'})

                expect(res.status).toBe(200)
        })

        it("should return 401 when passed uncorrect  data", async () => {
            const res = await supertest(server)
                .post("/api/auth/login")
                .send({username: 'samidddd', password: 'pass'})

                expect(res.status).toBe(401)
        })

        it("should return 401 when passed uncorrect  data", async () => {
            const res = await supertest(server)
                .post("/api/auth/login")
                .send({username: 'sami', password: 'pass'})

                expect(res.type).toMatch(/json/i)
        })


        it("should return token when passed  data", async () => {
            const res = await supertest(server)
                .post("/api/auth/login")
                .send({username: 'sami', password: 'pass'})

                expect(res.body).toHaveProperty('token')
        })
    })


})