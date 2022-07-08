const request = require('supertest');

describe('Receipt Test Suite', () => {
  it('test get /:usrId endpoints', async() => {
    const response = await request('https://virtual-receipts.herokuapp.com').get("/receipt/62b6366bd4d2330146fa1dc4");
    expect(response.body).toEqual([{"_id":"62bc959b80089a9605254c42","user_id":"62b6366bd4d2330146fa1dc4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"Walmart","city":"Denver","state":"CO","purchase_type":"Groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

//   it('test post / endpoints', async() => {
//     const body = {
//       username: "johndoe56",
//       password: "P@55word",
//       email: "john.doe@email.com",
//       privelage: 1
//     };
//     const response = await request('https://virtual-receipts.herokuapp.com').post("/user/").send(body);
//     expect(response.statusCode).toBe(201);
//   });

//   it('test delete /:id endpoints', async() => {
//     const response = await request('https://virtual-receipts.herokuapp.com').delete("/user/62c844c1a1f7b551a8e03976");
//     expect(response.statusCode).toBe(204);
//   });
});