import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import { socket } from "../../client-socket.js";
import "./Game.css";

const Game = (props) => {
  const [player1Point, setPlayer1Point] = useState(0);
  const [player2Point, setPlayer2Point] = useState(0);
  const [word, setWord] = useState("");
  const [turn, setTurn] = useState(1);
  let userId1 = '';
  for (let i = 0; i < props.pairing.player1.userId.length; i++)
  {
    userId1 += props.pairing.player1.userId[i];
  }
  let userId2 = '';
  for (let i = 0; i < props.pairing.player2.userId.length; i++)
  {
    userId2 += props.pairing.player2.userId[i];
  }
  if (turn % 2 === 1)
  {
    if (props.pairing.player1.userId === props.userId)
    {
      useEffect(() => {
        get("/api/getword", {opponent: userId2}).then((word) => {
          setWord(word.word);
        });
      }, []);
      return (
        <>
          <div>You are playing with {props.pairing.player2.userId}</div>
          <div>
            Your word is
          </div>
        </>
      );
    }
    else
    {
      useEffect(() => {
        const changeWord = (newWord) => {
          setWord(newWord.word);
        };
        socket.on("found_word", changeWord);
        return () => {
          socket.off("found_word", changeWord);
        };
      }, []);
      return (
        <>
          <div>You are playing with {props.pairing.player1.userId}</div>
          <div>
            The hint is
          </div>
        </>
      );
    }
  }
  else
  {
    if (props.pairing.player1.userId === props.userId)
    {
      useEffect(() => {
        const changeWord = (newWord) => {
          setWord(newWord.word);
        };
        socket.on("found_word", changeWord);
        return () => {
          socket.off("found_word", changeWord);
        };
      }, []);
      return (
        <>
          <div>You are playing with {props.pairing.player2.userId}</div>
          <div>
            The hint is {word}
          </div>
        </>
      );
    }
    else
    {
      useEffect(() => {
        get("/api/getword", {opponent: userId1}).then((word) => {
          setWord(word.word);
        });
      }, []);
      return (
        <>
          <div>You are playing with {props.pairing.player1.userId}</div>
          <div>
            Your word is {word}
          </div>
        </>
      );
    }
  }
};

export default Game;
