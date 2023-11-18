const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { token } = require("../middleware/authenticateToken");

beforeAll(async () => {
  const users = require("../data/users.json").map((user) => {
    delete user.id;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  });
  await sequelize.queryInterface.bulkInsert("Users", users);
  const profiles = require("../data/profiles.json").map((profile) => {
    delete profile.id;
    profile.createdAt = new Date();
    profile.updatedAt = new Date();
    return profile;
  });
  await sequelize.queryInterface.bulkInsert("Profiles", profiles);
  const posts = require("../data/posts.json").map((post) => {
    delete post.id;
    post.createdAt = new Date();
    post.updatedAt = new Date();
    return post;
  });
  await sequelize.queryInterface.bulkInsert("Posts", posts);
  const comments = require("../data/comments.json").map((comment) => {
    delete comment.id;
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
    return comment;
  });
  await sequelize.queryInterface.bulkInsert("Comments", comments);
  const likes = require("../data/likes.json").map((like) => {
    delete like.id;
    like.createdAt = new Date();
    like.updatedAt = new Date();
    return like;
  });
  await sequelize.queryInterface.bulkInsert("Likes", likes);
  const media = require("../data/media.json").map((medium) => {
    delete medium.id;
    medium.createdAt = new Date();
    medium.updatedAt = new Date();
    return medium;
  });
  await sequelize.queryInterface.bulkInsert("Media", media);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Profiles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Posts", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Comments", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Likes", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Media", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// Users tests
describe("GET /users", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });
});

describe("GET /users/:id", () => {
  it("should return a user", async () => {
    const res = await request(app).get("/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });
});

describe("POST /auth/register", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "test1",
      email: "test1@gmail.com",
      password: "test1",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });
});

describe("POST /auth/login", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test1@gmail.com",
      password: "test1",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("GET /auth/github", () => {
  it("should login a user with github", async () => {
    const res = await request(app).get("/auth/github");
    expect(res.statusCode).toEqual(302);
  });
});

describe("GET /auth/github/callback", () => {
  it("should login a user with github", async () => {
    const res = await request(app).get("/auth/github/callback");
    expect(res.statusCode).toEqual(302);
  });
});

describe("GET /users/:id/profile", () => {
  it("should return a user's profile", async () => {
    const res = await request(app).get("/users/1/profile");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("bio");
    expect(res.body).toHaveProperty("profile_picture");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });
});
