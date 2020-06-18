const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//Get Request

server.get("/accounts", async (req, res, next) => {
  try {
    const account = await db.select("*").from("accounts");

    res.json(account);
  } catch (err) {
    next(err);
  }
});

//Get Request By ID

server.get("/accounts/:id", async (req, res, next) => {
  try {
    const [account] = await db
      .select("*")
      .from("accounts")
      .where("id", req.params.id);

    res.json(account);
  } catch (err) {
    next(err);
  }
});

//Post Request Or Create

server.post("/accounts", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    const [accoutId] = await db.insert(payload).into("accounts");

    const account = await db.first("*").from("accounts").where("id", accoutId);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

//Put Request or Update

server.put("/accounts/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    await db("accounts").update(payload).where("id", req.params.id);

    const account = await db.from("accounts").where("id", req.params.id);

    res.json(account);
  } catch (err) {
    next(err);
  }
});

//Delete Request

server.delete("/accounts/:id", async (req, res, next) => {
  try {
    await db("accounts").where("id", req.params.id).del();

    const account = await db
      .first("*")
      .from("accounts")
      .where("id", req.params.id);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

module.exports = server;
