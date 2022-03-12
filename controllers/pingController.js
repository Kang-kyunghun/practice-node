const ping = async (req, res) => {
  try {
    return res.status(200).json({ ping: "pong" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { ping };
