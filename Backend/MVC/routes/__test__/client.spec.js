const supertest = require("supertest");
const { app, db } = require("../../../app");
// Create a Request Object
const request = supertest(app);

const ClientModel = require("../../models/client.model");



describe("Test the Client Route", () => {
  it("GET / Route", async () => {
    const response = await request.get("/client");

    expect(response.status).toBe(403); // 403 => forbidding (not authorized)

  })

});