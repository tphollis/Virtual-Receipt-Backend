const request = require('supertest');

describe('User Test Suite', () => {
  it('test get /:username endpoints', async() => {
    const data = {
      "_id": "62d1c729dae59700115bc8d4",
      "connection": "virtual-receipt-wallet",
      "client_id": "ym3cOJMljCo76IkoBcHyitmUqQzAe7sm",
      "email": "thomas.ticki.hollis@gmail.com",
      "username": "tphollis",
      "password": "$2b$10$BYzwT5oW1IHp/FlG3n4G8uOx6KuRh.hcxhU0IAiMVGvZwzQaC8j4O",
      "tenant": "dev-zql-y9ma",
      "transaction": {
        "id": "dM-u_RhQXVxibpz9d9g2Pumr77xOktvP",
        "locale": "en",
        "protocol": "oidc-implicit-profile",
        "requested_scopes": [
          "openid",
          "profile",
          "email"
        ],
        "acr_values": [],
        "ui_locales": [],
        "redirect_uri": "https://virtual-receipts2.herokuapp.com/callback",
        "prompt": [],
        "state": "eyJyZXR1cm5UbyI6Imh0dHBzOi8vdmlydHVhbC1yZWNlaXB0czIuaGVyb2t1YXBwLmNvbS8ifQ",
        "login_hint": null,
        "response_mode": "form_post",
        "response_type": [
          "id_token"
        ]
      },
      "request_language": "en-US,en;q=0.9"
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').get("/user/tphollis");
    expect(response.body).toEqual(data);
    expect(response.statusCode).toBe(200);
  });

  it('test post / endpoints', async() => {
    const body = {
      username: "johndoe56",
      password: "P@55word",
      email: "john.doe@email.com",
      privelage: 1
    };
    const response = await request('https://virtual-receipts2.herokuapp.com').post("/user/").send(body);
    expect(response.statusCode).toBe(201);
  });

  it('test delete /:id endpoints', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').delete("/user/62d1c8339240bcb1cd80d67");
    expect(response.statusCode).toBe(400);
  });

  it('test delete /:id endpoints', async() => {
    const response = await request('https://virtual-receipts2.herokuapp.com').delete("/user/62d1d7e49f95878675b71bf5");
    expect(response.statusCode).toBe(204);
  });
});