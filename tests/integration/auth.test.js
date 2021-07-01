const request = require("supertest");
const {Genre} = require("../../models/genre");
const {User} = require("../../models/user");

let server, token;

describe("auth middleware",() => {
   beforeEach(() => {
      server = require("../../index");

      token = new User().generateAuthToken();
   })

   afterEach(async() => {
      await Genre.remove({})
      server.close();
   })

   const exec = () => {
      return request(server)
         .post("/api/genres")
         .set("x-auth-token",token)
         .send({name: "genre1"})
   }

   it("should return 401 if no token is provided",async() => {
      token = '';
      const result = await exec();

      expect(result.status).toBe(401);
   })

   it("should return 401 if token is invalid",async() => {
      token = 'loulou';
      const result = await exec();

      expect(result.status).toBe(400);
   })

   it("should return 200 if token is valid",async() => {
      const res = await exec();
      expect(res.status).toBe(200);
   })
})
