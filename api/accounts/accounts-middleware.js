const db = require("../../data/db-config");
const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    next({ status: 400, message: "name and budget are required" });
  } else if (typeof name !== "string") {
    next({ status: 400, message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    req.name = name;
    req.budget = budget;
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  const matchedName = await db("accounts").where("name", name.trim()).first();

  if (matchedName) {
    next({ status: 400, message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id).then((account) => {
    if (account) {
      req.account = account;
      next();
    } else {
      next({ status: 404, message: "account not found" });
    }
  });
};
