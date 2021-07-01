const config = require("config");
const {User} = require("../../../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

describe("user.generateAuthToken",() => {
   it("should generate a valid JWT",async () => {
      const userData = {
         _id: new mongoose.Types.ObjectId().toHexString(),
         isAdmin: true
      }

      let user = new User(userData)

      const generatedToken = user.generateAuthToken();
      const decoded = await jwt.verify(generatedToken,config.get("jwtPrivateKey"));

      expect(decoded).toMatchObject(userData);
   })
})
