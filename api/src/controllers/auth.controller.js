function postGuest(req, res) {
  res.json({
    token: "mock.jwt.guest",
    user: { id: "guest", role: "guest", displayName: "Guest" }
  });
}

function postLogin(req, res) {
  const { email } = req.body || {};
  res.json({
    token: "mock.jwt.user",
    user: { id: "u_123", role: "user", email: email || "test@example.com" }
  });
}

function postRegister(req, res) {
  const { email } = req.body || {};
  res.json({
    token: "mock.jwt.user",
    user: { id: "u_456", role: "user", email: email || "new@example.com" }
  });
}

module.exports = { postGuest, postLogin, postRegister };
