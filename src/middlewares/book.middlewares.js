const checkBody = (req, res, next) => {
  const { body } = req;
  if (!req.body) {
    res.status(400).send({
      status: "FAILED",
      message:
        "Sorry, sorry, one of the following is missing;\ntitle\nauthorName\nprice",
    });
  } else {
    next();
  }
};

module.exports = { checkBody };