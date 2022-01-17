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

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/deletequeue", (req, res) => {
  Queue.deleteMany({userId: req.query.userId}).then((players) => {
    console.log("deleted");
  });
});

router.get("/randomgame", (req, res) => {
  Queue.findOneAndDelete({userId: {$ne: req.query.userId}, gameType: req.query.gameType}).then((player) => {
    if (!player)
    {
      console.log("no opponent");
      Queue.findOne({userId: req.query.userId, gameType: req.query.gameType}).then((player) => {
        if (!player)
        {
          console.log("empty room");
          const newPlayer = new Queue({userId: req.query.userId, gameType: req.query.gameType});
          newPlayer.save();
          res.send({player1: newPlayer, player2: newPlayer});
        }
        else
        {
          console.log("found self");
          res.send({player1: player, player2: player});
        }
      });
    }
    else
    {
      const ownPlayer = new Queue({userId: req.query.userId, gameType: req.query.gameType});
      console.log("found opponent");
      const firstTurn = Math.floor(Math.random() * 2);
      if (firstTurn === 0)
      {
        res.send({player1: ownPlayer, player2: player});
        socketManager.getSocketFromUserID(player.userId).emit("found_opponent", {player1: ownPlayer, player2: player});
      }
      else
      {
        res.send({player1: player, player2: ownPlayer});
        socketManager.getSocketFromUserID(player.userId).emit("found_opponent", {player1: player, player2: ownPlayer});
      }
    }
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
