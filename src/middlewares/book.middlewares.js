const checkBody = (req, res) => {
  const { body } = req;
  if (!req.body) {
    res.status(400).send({
      status: "FAILED",
      message: "Sorry, user must have a body",
    });
  }
};

module.exports = checkBody;
