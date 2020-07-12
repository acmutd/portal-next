// unit tests for env file
describe("env", () => {
  it("should have an auth0 domain", () => {
    expect(process.env.REACT_APP_AUTH0_DOMAIN).toBeDefined();
  });
  it("should have an auth0 clientID", () => {
    expect(process.env.REACT_APP_AUTH0_CLIENTID).toBeDefined();
  });
  it("should have an auth0 audience", () => {
    expect(process.env.REACT_APP_AUTH0_AUDIENCE).toBeDefined();
  });
});