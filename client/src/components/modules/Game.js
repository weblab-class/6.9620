import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities"
import { socket } from "../../client-socket.js";
import "./Game.css";

const Game = (props) => {


  // initialize states]
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [change, setChange] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");


  // getting userId1, for some reason, passing props.pairing.player1.userId.length to the API request does not work
  let userId1 = '';
  for (let i = 0; i < props.pairing.player1.userId.length; i++)
  {
    userId1 += props.pairing.player1.userId[i];
  }// getting userId2
  let userId2 = '';
  for (let i = 0; i < props.pairing.player2.userId.length; i++)
  {
    userId2 += props.pairing.player2.userId[i];
  }


  // get names
  useEffect (() => {
    get(`/api/user`, { userid: userId1 }).then((user) => {setName1(user.name);});
  }, []);
  useEffect (() => {
    get(`/api/user`, { userid: userId2 }).then((user) => {setName2(user.name);});
  }, []);
  useEffect(() => {
    const changeTurn = (point) => {
      setChange(true);
    };
    socket.on("change", changeTurn);
    return () => {
      socket.off("change", changeTurn);
    };
  }, []);


  // splitting the case, whether or not this player is player 1 or player 2, and whether it is player 1's turn or player 2's turn
  if (props.curr_turn % 2 === 1)
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


      // handle hint submission
      const submitHint = (hint) => {
        post("/api/hint", {hint: hint, opponent: props.pairing.player2.userId});
        setHint(hint);
      };
      const handleChange = (event) => {
        setValue(event.target.value);
      };
      const handleSubmitHint = (event) => {
        event.preventDefault();
        submitHint(value);
        setValue("");
      };


      if (change)
      {
        return (
          <>
            <Game turns={6} pairing={props.pairing} userId={props.userId} curr_turn={props.curr_turn + 1} curr_point1={0} curr_point2={0} />
          </>
        );
      }
      return (
        <>
          <div className="titleContainer">
            <h1 className="title">You are playing with {name2}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">Your word is {word}</p>
          </div>
          <div className="container">
            <div className="hintContainer">
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
                onClick={handleSubmitHint}
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
      const [value, setValue] = useState("");


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


      // getting new hint
      useEffect(() => {
        const changeHint = (newHint) => {
          setHint(newHint);
        };
        socket.on("hint", changeHint);
        return () => {
          socket.off("hint", changeHint);
        };
      }, []);
      

      // handle answer submission
      const submitAnswer = (answer) => {
        console.log(answer);
        post("/api/answer", {answer: answer, pairing: props.pairing, word: word});
      };
      const handleChange = (event) => {
        setValue(event.target.value);
      };
      const handleSubmitAnswer = (event) => {
        event.preventDefault();
        submitAnswer(value);
        setValue("");
      };


      if (change)
      {
        return (
          <>
            <Game turns={6} pairing={props.pairing} userId={props.userId} curr_turn={props.curr_turn + 1} curr_point1={0} curr_point2={0} />
          </>
        );
      }
      return (
        <>
          <div className="titleContainer">
            <h1 className="title">You are playing with {name1}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">The hint is {hint}</p>
          </div>
          
          <div className="container">
            <div className="hintContainer">
              <input
                type="text"
                placeholder="Your Answer"
                value={value}
                onChange={handleChange}
                className="NewPostInput-input"
              />
              <button
                type="submit"
                value="Submit"
                onClick={handleSubmitAnswer}
                className="NewPostInput-button"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </>
      );
    }
  }
  else
  {
    if (props.pairing.player1.userId === props.userId)
    {
      const [value, setValue] = useState("");



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


      // getting new hint
      useEffect(() => {
        const changeHint = (newHint) => {
          setHint(newHint);
        };
        socket.on("hint", changeHint);
        return () => {
          socket.off("hint", changeHint);
        };
      }, []);
      

      // handle answer submission
      const submitAnswer = (answer) => {
        console.log(answer);
        post("/api/answer", {answer: answer, pairing: props.pairing, word: word});
      };
      const handleChange = (event) => {
        setValue(event.target.value);
      };
      const handleSubmitAnswer = (event) => {
        event.preventDefault();
        submitAnswer(value);
        setValue("");
      };


      if (change)
      {
        return (
          <>
            <Game turns={6} pairing={props.pairing} userId={props.userId} curr_turn={props.curr_turn + 1} curr_point1={0} curr_point2={0} />
          </>
        );
      }
      return (
        <>
          <div className="titleContainer">
            <h1 className="title">You are playing with {name2}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">The hint is {hint}</p>
          </div>
          
          <div className="container">
            <div className="hintContainer">
              <input
                type="text"
                placeholder="Your Answer"
                value={value}
                onChange={handleChange}
                className="NewPostInput-input"
              />
              <button
                type="submit"
                value="Submit"
                onClick={handleSubmitAnswer}
                className="NewPostInput-button"
              >
                Submit Answer
              </button>
            </div>
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


      // handle hint submission
      const submitHint = (hint) => {
        post("/api/hint", {hint: hint, opponent: props.pairing.player1.userId});
        setHint(hint);
      };
      const handleChange = (event) => {
        setValue(event.target.value);
      };
      const handleSubmitHint = (event) => {
        event.preventDefault();
        submitHint(value);
        console.log(answer);
        setValue("");
      };


      if (change)
      {
        return (
          <>
            <Game turns={6} pairing={props.pairing} userId={props.userId} curr_turn={props.curr_turn + 1} curr_point1={0} curr_point2={0} />
          </>
        );
      }
      return (
        <>
          <div className="titleContainer">
            <h1 className="title">You are playing with {name1}</h1>
          </div>
          <div className="wordContainer">
            <p className="word">Your word is {word}</p>
          </div>
          <div className="container">
            <div className="hintContainer">
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
                onClick={handleSubmitHint}
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
