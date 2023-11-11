const checkBody = (req, res, next) => {
  const { body } = req;
  if (!req.body) {
    res.status(400).send({
      status: "FAILED",
      message: "Sorry, user must have a body",
    });
  } else {
    next()
  }
};

module.exports = {checkBody};
