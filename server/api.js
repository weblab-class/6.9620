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
const getWord = require("./models/getWord");

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

router.post("/createword", (req,res) => {
  const newWord1 = new getWord({word: "apple"});
  const newWord2 = new getWord({word: "santa"});
  const newWord3 = new getWord({word: "pickle"});
  const newWord4 = new getWord({word: "doctor"});
  const newWord5 = new getWord({word: "mit"});
  const newWord6 = new getWord({word: "bottle"});
  const newWord7 = new getWord({word: "wind"});
  const newWord8 = new getWord({word: "mask"});
  const newWord9 = new getWord({word: "covid"});
  const newWord10 = new getWord({word: "candy"});
  newWord1.save();
  newWord2.save();
  newWord3.save();
  newWord4.save();
  newWord5.save();
  newWord6.save();
  newWord7.save();
  newWord8.save();
  newWord9.save();
  newWord10.save();
});

router.get("/getword", (req,res) => {
  getWord.find({}).then((words) => {
    const pick = Math.floor(Math.random() * words.length)
    res.send(words[pick]);
    socketManager.getSocketFromUserID(req.query.opponent).emit("found_word", words[pick]);
  });
});

router.post("/hint", (req, res) => {
  console.log(req.body.hint);
  socketManager.getSocketFromUserID(req.body.opponent).emit("hint", req.body.hint);
  // TODO
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
