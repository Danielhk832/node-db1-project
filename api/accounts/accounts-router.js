const router = require("express").Router();
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const data = await Accounts.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Accounts.create(req.body);
      res
        .status(201)
        .json({ name: newAccount.name.trim(), budget: newAccount.budget });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const data = await Accounts.updateById(req.params.id, req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const data = await Accounts.deleteById(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
