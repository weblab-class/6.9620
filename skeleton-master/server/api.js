/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const Queue = require("./models/gameCode");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/randomgame", (req, res) => {
  Queue.findOneAndDelete({userId: {$ne: req.query.userId}, gameType: req.query.gameType}).then((player) => {
    if (!player)
    {
      Queue.findOne({userId: req.query.userId, gameType: req.query.gameType}).then((player) => {
        if (!player)
        {
          const newPlayer = new Queue({userId: req.query.userId, gameType: req.query.gameType});
          newPlayer.save();
          res.send(newPlayer);
        }
        else
        {
          res.send(player);
        }
      });
    }
    else
    {
      console.log("found opponent");
      res.send(player);
    }
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
