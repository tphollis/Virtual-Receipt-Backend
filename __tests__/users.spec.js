const request = require('supertest');

describe('User Test Suite', () => {
  it('test get /:username endpoints', async() => {
    const response = await request('http://localhost:3000').get("/user/tphollis");
    expect(response.body).toEqual({"_id":"62b6366bd4d2330146fa1dc4","username":"tphollis","password":"P@55word","email":"thomas.ticki.hollis@gmail.com","privelage":1});
    expect(response.statusCode).toBe(200);
  });

  it('test post / endpoints', async() => {
    const body = {
      username: "johndoe56",
      password: "P@55word",
      email: "john.doe@email.com",
      privelage: 1
    };
    const response = await request('http://localhost:3000').post("/user/").send(body);
    expect(response.statusCode).toBe(201);
  });

  it('test delete /:id endpoints', async() => {
    const response = await request('http://localhost:3000').delete("/user/62c70593ddda8fbfae02bcf0");
    expect(response.statusCode).toBe(204);
  });
});