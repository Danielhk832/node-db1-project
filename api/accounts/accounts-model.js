const db = require("../../data/db-config");

const getAll = async () => {
  const result = await db("accounts");

  return result;
};

const getById = async (id) => {
  const result = await db("accounts").where("id", id).first();

  return result;
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  const post = await getById(id);
  return post;
};

const updateById = async (id, account) => {
  await db("accounts").update(account).where({ id });
  return getById(id);
};

const deleteById = async (id) => {
  const result = await db("accounts").del().where({ id });
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
