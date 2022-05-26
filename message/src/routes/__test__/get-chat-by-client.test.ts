import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to the endpoint", async () => {
  const response = await request(app)
    .get("/api/message/chat/627bbdd00591676eb1aea111")
    .send();

  expect(response.status).not.toEqual(404);
});

it("chat is not found with the given client", async () => {
  await request(app)
    .get("/api/message/chat/627bbdd00591676eb1aea111")
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("returns a error when not authorized", async () => {
  await request(app)
    .get("/api/message/chat/627bbdd00591676eb1aea111")
    .send()
    .expect(401);
});

// it("gets a list of chats", async () => {
//   await request(app)
//     .get("/api/message/chat/627bbdd00591676eb1aea111")
//     .set("Cookie", global.signin())
//     .send()
//     .expect(404);
// });
