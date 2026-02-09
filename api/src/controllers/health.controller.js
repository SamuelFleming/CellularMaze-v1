function getHealth(req, res) {
  res.json({ ok: true, service: "api", time: new Date().toISOString() });
}

module.exports = { getHealth };
