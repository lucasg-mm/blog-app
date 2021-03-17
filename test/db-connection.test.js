// tests the database connection

require("dotenv").config();
const mongoose = require("mongoose");
const postService = require("../services/post-service");

describe("Connection", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  test("Retrieve post by id", async () => {
    // retrieves a test post by id to test the connection  
    const id = "60526dbe5ea474c24f2282f6";
    const post = await postService.getPostById(id);
    expect(post.title).toBe("teste");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
