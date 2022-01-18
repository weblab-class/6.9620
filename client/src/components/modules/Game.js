import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities"
import { socket } from "../../client-socket.js";
import "./Game.css";

const Game = (props) => {


  // initialize states
  const [player1Point, setPlayer1Point] = useState(0);
  const [player2Point, setPlayer2Point] = useState(0);
  // for both players, the current word is always stored in the word state
  const [word, setWord] = useState("");
  const [turn, setTurn] = useState(1);


  // getting userId1, for some reason, passing props.pairing.player1.userId.length to the API request does not work
  let userId1 = '';
  for (let i = 0; i < props.pairing.player1.userId.length; i++)
  {
    userId1 += props.pairing.player1.userId[i];
  }


  // getting userId2
  let userId2 = '';
  for (let i = 0; i < props.pairing.player2.userId.length; i++)
  {
    userId2 += props.pairing.player2.userId[i];
  }


  // splitting the case, whether or not this player is player 1 or player 2, and whether it is player 1's turn or player 2's turn
  if (turn % 2 === 1)
  {
    if (props.pairing.player1.userId === props.userId)
    {      
      const [value, setValue] = useState("");
      // asking for a new word
      useEffect(() => {
        get("/api/getword", {opponent: userId2}).then((word) => {
          setWord(word.word);
        });
      }, []);

      const submitHint = (hint) => {
        let hintPro = '';
        for (let i = 0; i < hint.length; i++)
        {
          hintPro += hint[i];
        }
        post("/api/hint", {hint: hintPro});
      }

      const handleChange = (event) => {
        setValue(event.target.value);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        submitHint(value);
        setValue("");
      };
      return (
        <>
          <div className="titleContainer">
            <h1 className="title">You are playing with {props.pairing.player2.userId}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">Your word is {word}</p>
          </div>
          <div className="container">
            <div className="GameCodeContainer">
              <input
                type="text"
                placeholder="Your Hint"
                value={value}
                onChange={handleChange}
                className="NewPostInput-input"
              />
              <button
                type="submit"
                value="Submit"
                onClick={handleSubmit}
                className="NewPostInput-button"
              >
                Submit Hint
              </button>
            </div>
          </div>
        </>
      );
    }
    else
    {
      // getting new word
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
          <div className="titleContainer">
            <h1 className="title">You are playing with {props.pairing.player1.userId}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">The hint is</p>
          </div>
        </>
      );
    }
  }
  else
  {
    if (props.pairing.player1.userId === props.userId)
    {
      // getting new word
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
          <div className="titleContainer">
            <h1 className="title">You are playing with {props.pairing.player2.userId}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">The hint is</p>
          </div>
        </>
      );
    }
    else
    {
      const [value, setValue] = useState("");
      // asking for a new word
      useEffect(() => {
        get("/api/getword", {opponent: userId1}).then((word) => {
          setWord(word.word);
        });
      }, []);

      const submitHint = (hint) => {
        let hintPro = '';
        for (let i = 0; i < hint.length; i++)
        {
          hintPro += hint[i];
        }
        post("/api/hint", {hint: hintPro});
      }

      const handleChange = (event) => {
        setValue(event.target.value);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        submitHint(value);
        setValue("");
      };
      return (
        <>
          <div className="titleContainer">
            <h1 className="title">You are playing with {props.pairing.player1.userId}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">Your word is {word}</p>
          </div>
          <div className="container">
            <div className="GameCodeContainer">
              <input
                type="text"
                placeholder="Your Hint"
                value={value}
                onChange={handleChange}
                className="NewPostInput-input"
              />
              <button
                type="submit"
                value="Submit"
                onClick={handleSubmit}
                className="NewPostInput-button"
              >
                Submit Hint
              </button>
            </div>
          </div>
        </>
      );
    }
  }
};

export default Game;
