const request = require('supertest');

describe('Receipt Test Suite', () => {
  it('test get /:usrId endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/62d1c729dae59700115bc8d4");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get /:usrId endpoint validation', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/62d1c729dae59700115bc8d");
    expect(response.statusCode).toBe(400);
  });

  it('test get find/:usrId&total&:value endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d4&total&75");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get find/:usrId&store&:value endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d4&store&walmart");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get find/:usrId&city&:value endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d4&city&denver");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get find/:usrId&state&:value endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d4&state&colorado");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get find/:usrId&purchase_type&:value endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d4&purchase_type&groceries");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get find/:usrId&date&:value endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d4&date&2010-04-29");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get find/:usrId&:field&:value endpoint id validation', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d&date&2010-04-29");
    expect(response.statusCode).toBe(400);
  });

  it('test get find/:usrId&:field&:value endpoint field validation', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/find/62d1c729dae59700115bc8d4&_id&2010-04-29");
    expect(response.statusCode).toBe(400);
  });

  it('test get find/:usrId&:date1&:date2 endpoint', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/range/62d1c729dae59700115bc8d4&2010-04-00&2010-05-20");
    expect(response.body).toEqual([{"_id":"62d1cad59f95878675b71bec","user_id":"62d1c729dae59700115bc8d4","date":"2010-04-29T00:00:00.000Z","total":75.38,"store":"walmart","city":"denver","state":"colorado","purchase_type":"groceries","image":"image base64"}]);
    expect(response.statusCode).toBe(200);
  });

  it('test get find/:usrId&:date1&:date2 endpoint validation', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/receipt/range/62d1c729dae59700115bc8d&2010-04-00&2010-05-20");
    expect(response.statusCode).toBe(400);
  });

  it('test post / endpoint', async() => {
    const body = {
      "user_id": "62d1c729dae59700115bc8d4",
      "date": "2010-04-29",
      "total": 75.38,
      "store": "walmart",
      "city": "denver",
      "state": "colorado",
      "purchase_type": "groceries",
      "image": "image base64"
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').post("/receipt/").send(body);
    expect(response.statusCode).toBe(201);
  });

  it('test post / endpoint validation', async() => {
    const body = {
      "user_id": "62d1c729dae59700115bc8d",
      "date": "2010-04-29",
      "total": 75.38,
      "store": "walmart",
      "city": "denver",
      "state": "colorado",
      "purchase_type": "groceries",
      "image": "image base64"
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').post("/receipt/").send(body);
    expect(response.statusCode).toBe(400);
  });

  it('test put /:id endpoint', async() => {
    const body = {
      "user_id": "62d1c729dae59700115bc8d",
      "date": "2010-04-29",
      "total": 75.38,
      "store": "walmart",
      "city": "denver",
      "state": "colorado",
      "purchase_type": "groceries",
      "image": "null"
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').put("/receipt/62d1cad59f95878675b71bec").send(body);
    expect(response.statusCode).toBe(204);
  });

  it('test put /:id endpoint revert', async() => {
    const body = {
      "user_id": "62d1c729dae59700115bc8d",
      "date": "2010-04-29",
      "total": 75.38,
      "store": "walmart",
      "city": "denver",
      "state": "colorado",
      "purchase_type": "groceries",
      "image": "image base64"
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').put("/receipt/62d1cad59f95878675b71bec").send(body);
    expect(response.statusCode).toBe(204);
  });

  it('test put /:id endpoint id validation', async() => {
    const body = {
      "user_id": "62d1c729dae59700115bc8d",
      "date": "2010-04-29",
      "total": 75.38,
      "store": "walmart",
      "city": "denver",
      "state": "colorado",
      "purchase_type": "groceries",
      "image": "image base64"
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').put("/receipt/62d1cad59f95878675b71be").send(body);
    expect(response.statusCode).toBe(400);
  });

  it('test put /:id endpoint user_id validation', async() => {
    const body = {
      "user_id": "62d1c729dae59700115bc8d",
      "date": "2010-04-29",
      "total": 75.38,
      "store": "walmart",
      "city": "denver",
      "state": "colorado",
      "purchase_type": "groceries",
      "image": "image base64"
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').put("/receipt/62d1cad59f95878675b71bec").send(body);
    expect(response.statusCode).toBe(400);
  });

  // it('test delete /:id endpoints', async() => {
  //   const response = await request('https://virtual-receipts.herokuapp.com').delete("/user/62c844c1a1f7b551a8e03976");
  //   expect(response.statusCode).toBe(204);
  // });
});