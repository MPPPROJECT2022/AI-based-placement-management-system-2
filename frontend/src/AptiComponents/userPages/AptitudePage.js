import "./aptistyles.css";
import React, { useState } from "react";


function AptitudePage({history}) {
  const orgName1 = "Tech Phantoms"
  const testID = "tech2022"
  //question data_______________________Start______________________
  // /aptitude/getQuestions
  if(!localStorage.userInfo){
    history.push("/");
  }
  const LoginInfo = JSON.parse(localStorage.userInfo)
  // console.log(LoginInfo.orgname)
  const data1 = {
     orgName : orgName1,
     testId: testID
  }

  fetch('http://localhost:5000/aptitude/getQuestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orgName: "Tech Phantoms", testId: "tech2022"})
  })
    .then((response) => {
      return response.json();
    }) .then((myJson) => {
      console.log(myJson)
    });


  const data = [
    {
      id: "1",
      question: "Which letter of the alphabet has the most water?",
      answer: "C",
      marks: 2,
      options: [`A`, `B`, `C`]
    },
    {
      id: "2",
      question: "What kind of dog keeps the best time?",
      answer: "Watchdog",
      marks: 2,
      options: [`Watchdog`, `hotdog`, `Cutedog`]
    },
    {
      id: "3",
      question: "Which letter of the alphabet has the most water?",
      answer: "C",
      marks: 2,
      options: [`A`, `B`, `C`]
    },
    {
      id: "4",
      question: "What kind of dog keeps the best time?",
      answer: "Watchdog",
      marks: 2,
      options: [`Watchdog`, `hotdog`, `Cutedog`]
    }

  ]


  //question data_______________________End______________________








  //user part________________________Start____________________
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [myAnswer, setMyAnswer] = useState("");
  var [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [show, setShow] = useState(false);
  const [clickAnswer, setClickAnswer] = useState(false);

  //user part________________________end____________________

  //Main Logic________________________Start________________________________

  //this will set user's answer when he/she click on a options
  const checkAnswer = (options) => {
    setMyAnswer(options);

  };

  //this will compare user's answer with the correct answer and setScore
  const checkCorrectAnswer = () => {
    if (myAnswer === data[currentQuestion].answer) {
      setScore(score + data[currentQuestion].marks);
    }
  };

  //this will determine the Exam is over or not
  const finishHandler = () => {
    if (currentQuestion === data.length-1) {
      setFinish(true);
    }
  };

  //this will reset the show answer button for the next question otherwise it will show again even user does not click on any variant
const reset = () => {
  setShow(false);
  setClickAnswer(false);
  };

  //Main Logic________________________End________________________________

  if (finish) {
    return (
      <div className="container m-4 p-4 mx-auto h-min-screen grid grid-rows-1 grid-cols-1 items-center">
        <div className="wrapper">
          <h3 className="m-4 p-2 h-30 text-center text-2xl font-bold">
            {`Test Completed! Your Final Score is
    ${score}`}
          </h3>
          <button
            className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-600 text-pink-400 font-bold hover:bg-gray-800 hover:text-pink-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container m-4 p-4 mx-auto h-min-screen grid grid-rows-1 grid-cols-1 items-center">
        <div className="wrapper">
          <h2 className="m-4 p-2 h-30 text-center text-2xl font-bold">
            {data[currentQuestion].question}
          </h2>
          <span className="m-2 border-2 border-black mx-auto px-2 bg-gray-600 text-pink-400 rounded-lg text-center">
            {`${currentQuestion}/${data.length - 1}`}
          </span>
          {data[currentQuestion].options.map((options) => (
            <div className="m-2 h-14 border-2 border-black mx-auto text-center">
              <p
                key={options.id}
                className={`options ${myAnswer === options
                  ? myAnswer === data[currentQuestion].answer
                    ? "correctAnswer"
                    : "incorrectAnswer"
                  : null
                  }`}
                onClick={() => checkAnswer(options)}
              >
                {options}
              </p>
            </div>
          ))}
          
          {currentQuestion < data.length-1 && (
            <button
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-600 text-pink-400 font-bold hover:bg-gray-800 hover:text-pink-600"
              onClick={() => {
                {
                  if (myAnswer === data[currentQuestion].answer) {
                    const final_score = score + data[currentQuestion].marks
                    score = final_score
                    console.log(final_score)
                    console.log(score)
                    setScore(score)
                  }
                };
                setCurrentQuestion(currentQuestion + 1);

                reset();
              }}
            >
              NEXT
            </button>
          )}
          {currentQuestion === data.length - 1 && (
            <button
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-600 text-pink-400 font-bold hover:bg-gray-800 hover:text-pink-600"
              onClick={() => {checkCorrectAnswer(); finishHandler(); }}
            >
              FINISH
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default AptitudePage



