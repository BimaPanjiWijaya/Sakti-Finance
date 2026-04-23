const request = require("supertest");
const app = require("../app");

describe("Express app", () => {
  it("responds with 401 for protected profile endpoint without token", async () => {
    const response = await request(app).get("/user/profile");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Invalid Token" });
  });

  it("responds with 400 for login request without email", async () => {
    const response = await request(app).post("/login").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "email is required" });
  });

  it("responds with 404 for unknown routes", async () => {
    jest.resetModules();

    let freshApp;

    jest.doMock(
      "../middlewares/authentication",
      () => (req, res, next) => next(),
    );

    jest.isolateModules(() => {
      freshApp = require("../app");
    });

    const response = await request(freshApp).get("/unknown-route");

    expect(response.status).toBe(404);
  });
});

describe("bin/www", () => {
  afterEach(() => {
    jest.resetModules();
    delete process.env.PORT;
  });

  it("starts the server on the default port", () => {
    const listen = jest.fn();

    jest.doMock("../app", () => ({
      listen,
    }));

    jest.isolateModules(() => {
      require("../bin/www");
    });

    expect(listen).toHaveBeenCalledWith(3001, expect.any(Function));
  });
});

describe("API endpoints", () => {
  let endpointApp;

  const mockComparePassword = jest.fn();
  const mockSignToken = jest.fn();
  const mockReverseGeocode = jest.fn();
  const mockVerifyIdToken = jest.fn();
  const mockUserCreate = jest.fn();
  const mockUserFindOne = jest.fn();
  const mockUserFindByPk = jest.fn();
  const mockUserFindOrCreate = jest.fn();
  const mockTransactionCreate = jest.fn();
  const mockTransactionFindAll = jest.fn();
  const mockTransactionFindOne = jest.fn();
  const mockInsightCreate = jest.fn();
  const mockInsightFindAll = jest.fn();
  const mockGemAi = jest.fn();

  beforeAll(() => {
    jest.resetModules();
    jest.dontMock("../app");

    jest.doMock("../middlewares/authentication", () => (req, res, next) => {
      req.user = { id: 1, email: "user@mail.com" };
      next();
    });

    jest.doMock(
      "../middlewares/authorization",
      () => (req, res, next) => next(),
    );

    jest.doMock("../helpers/bcrypt", () => ({
      comparePassword: mockComparePassword,
      hashPassword: jest.fn((value) => `hashed-${value}`),
    }));

    jest.doMock("../helpers/jwt", () => ({
      signToken: mockSignToken,
      verifyToken: jest.fn(),
    }));

    jest.doMock("../service/geocode", () => ({
      reverseGeocode: mockReverseGeocode,
    }));

    jest.doMock("google-auth-library", () => ({
      OAuth2Client: jest.fn().mockImplementation(() => ({
        verifyIdToken: mockVerifyIdToken,
      })),
    }));

    jest.doMock("../helpers/gemai", () => ({
      gemAi: mockGemAi,
    }));

    jest.doMock("../models", () => ({
      User: {
        create: mockUserCreate,
        findOne: mockUserFindOne,
        findByPk: mockUserFindByPk,
        findOrCreate: mockUserFindOrCreate,
      },
      Transaction: {
        create: mockTransactionCreate,
        findAll: mockTransactionFindAll,
        findOne: mockTransactionFindOne,
      },
      Insight: {
        create: mockInsightCreate,
        findAll: mockInsightFindAll,
      },
    }));

    jest.isolateModules(() => {
      endpointApp = require("../app");
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /register creates a user and returns 201", async () => {
    mockReverseGeocode.mockResolvedValue("Bandung");
    mockUserCreate.mockResolvedValue({
      toJSON: () => ({
        id: 1,
        name: "Bima",
        email: "bima@mail.com",
        salary: 5000,
        location: "Bandung",
        latitude: -6,
        longitude: 107,
        password: "hashed-password",
      }),
    });

    const response = await request(endpointApp)
      .post("/register")
      .send({
        name: "Bima",
        email: "bima@mail.com",
        password: "password",
        salary: 5000,
        location: { lat: -6, lon: 107 },
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Bima",
      email: "bima@mail.com",
      salary: 5000,
      location: "Bandung",
      latitude: -6,
      longitude: 107,
    });
  });

  it("POST /login returns an access token", async () => {
    mockUserFindOne.mockResolvedValue({
      id: 1,
      email: "bima@mail.com",
      password: "hashed-password",
    });
    mockComparePassword.mockReturnValue(true);
    mockSignToken.mockReturnValue("token-123");

    const response = await request(endpointApp).post("/login").send({
      email: "bima@mail.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ access_token: "token-123" });
  });

  it("POST /google-login returns an access token", async () => {
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => ({
        email_verified: true,
        email: "google@mail.com",
        name: "Google User",
      }),
    });
    mockUserFindOrCreate.mockResolvedValue([
      {
        id: 7,
        email: "google@mail.com",
      },
    ]);
    mockSignToken.mockReturnValue("google-token");
    mockReverseGeocode.mockResolvedValue("Jakarta");

    const response = await request(endpointApp)
      .post("/google-login")
      .set("access_token_google", "google-access-token")
      .send({ location: { lat: -6.2, lon: 106.8 } });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ access_token: "google-token" });
  });

  it("GET /user/profile returns the current user profile", async () => {
    mockUserFindByPk.mockResolvedValue({
      id: 1,
      name: "Bima",
      email: "bima@mail.com",
    });

    const response = await request(endpointApp).get("/user/profile");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Bima",
      email: "bima@mail.com",
    });
  });

  it("PATCH /user/profile/salary updates the salary", async () => {
    const save = jest.fn().mockResolvedValue();
    mockUserFindByPk.mockResolvedValue({
      id: 1,
      salary: 0,
      save,
      toJSON: () => ({
        id: 1,
        name: "Bima",
        email: "bima@mail.com",
        salary: 12000,
        password: "hashed-password",
      }),
    });

    const response = await request(endpointApp)
      .patch("/user/profile/salary")
      .send({ salary: 12000 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Bima",
      email: "bima@mail.com",
      salary: 12000,
    });
  });

  it("POST /transactions creates a transaction", async () => {
    mockTransactionCreate.mockResolvedValue({
      id: 1,
      type: "expense",
      amount: 10000,
      description: "Lunch",
      user_id: 1,
    });

    const response = await request(endpointApp).post("/transactions").send({
      type: "expense",
      amount: 10000,
      description: "Lunch",
      date: "2026-04-23",
      is_recurring: false,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      type: "expense",
      amount: 10000,
      description: "Lunch",
      user_id: 1,
    });
  });

  it("GET /transactions returns all user transactions", async () => {
    mockTransactionFindAll.mockResolvedValue([
      { id: 1, type: "expense" },
      { id: 2, type: "income" },
    ]);

    const response = await request(endpointApp).get("/transactions");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, type: "expense" },
      { id: 2, type: "income" },
    ]);
  });

  it("GET /transactions/:id returns a transaction by id", async () => {
    mockTransactionFindOne.mockResolvedValue({ id: 1, type: "expense" });

    const response = await request(endpointApp).get("/transactions/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, type: "expense" });
  });

  it("PUT /transactions/:id updates a transaction", async () => {
    const update = jest.fn().mockResolvedValue();
    mockTransactionFindOne.mockResolvedValue({
      id: 1,
      type: "expense",
      update,
    });

    const response = await request(endpointApp).put("/transactions/1").send({
      type: "income",
      amount: 20000,
      description: "Salary",
      date: "2026-04-23",
      is_recurring: false,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, type: "expense" });
  });

  it("DELETE /transactions/:id deletes a transaction", async () => {
    const destroy = jest.fn().mockResolvedValue();
    mockTransactionFindOne.mockResolvedValue({
      id: 1,
      destroy,
    });

    const response = await request(endpointApp).delete("/transactions/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Transaction deleted successfully",
    });
  });

  it("POST /insights generates an insight", async () => {
    mockUserFindByPk.mockResolvedValue({
      id: 1,
      name: "Bima",
      salary: 5000,
      location: "Jakarta",
    });
    mockTransactionFindAll.mockResolvedValue([
      { type: "expense", amount: 1000 },
      { type: "income", amount: 2500 },
    ]);
    mockGemAi.mockResolvedValue(
      JSON.stringify({
        summary: "Ringkasan finansial.",
        status: "Good",
        score: 80,
        recommendation: "Kurangi belanja tidak penting.",
      }),
    );
    mockInsightCreate.mockResolvedValue({
      id: 1,
      summary: "Ringkasan finansial.",
      status: "Good",
    });

    const response = await request(endpointApp).post("/insights").send({
      start_date: "2026-04-01T00:00:00.000Z",
      end_date: "2026-04-23T00:00:00.000Z",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Insight generated successfully",
      data: {
        id: 1,
        summary: "Ringkasan finansial.",
        status: "Good",
      },
    });
  });

  it("GET /insights returns all insights", async () => {
    mockInsightFindAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    const response = await request(endpointApp).get("/insights");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Insights retrieved successfully",
      data: [{ id: 1 }, { id: 2 }],
    });
  });
});
