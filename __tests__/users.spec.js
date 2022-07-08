const request = require('supertest');

describe('User Test Suite', () => {
  it('test get /:username endpoints', async() => {
    const response = await request('https://virtual-receipts.herokuapp.com').get("/user/tphollis");
    expect(response.body).toEqual({"_id":"62c8447ca1f7b551a8e03975","username":"tphollis","password":"P@55word","email":"thomas.ticki.hollis@gmail.com","privelage":1});
    expect(response.statusCode).toBe(200);
  });

  it('test post / endpoints', async() => {
    const body = {
      username: "johndoe56",
      password: "P@55word",
      email: "john.doe@email.com",
      privelage: 1
    };
    const response = await request('https://virtual-receipts.herokuapp.com').post("/user/").send(body);
    expect(response.statusCode).toBe(201);
  });

  it('test delete /:id endpoints', async() => {
    const response = await request('https://virtual-receipts.herokuapp.com').delete("/user/62c84586a1f7b551a8e03978");
    expect(response.statusCode).toBe(204);
  });
});