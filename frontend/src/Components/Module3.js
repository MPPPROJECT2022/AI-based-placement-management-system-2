import React, { useState, useEffect } from 'react'
import './module3.css'
import { useSpeechSynthesis } from "react-speech-kit"
import Navbar from './MainNavbar';
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { FaBorderStyle } from 'react-icons/fa';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'



function App() {
let flag = false;
var skipValue = false;

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [userAnswer, setuserAnswer] = useState([])
  const { speak } = useSpeechSynthesis();

  // Post Data UseState

  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState([]);
  const [requiredWords, setrequiredWords] = useState([]);
  const [topic, setTopic] = useState([]);
  const [fetchQuestions, setfetchQuestions] = useState([])

  

  useEffect(() => {
    handleListen()
  }, [isListening])


var myquestionArray= []
fetch('http://localhost:5000/technical/getTechnicalQuestions',{
  method: 'POST',
  // body: JSON.stringify({topic:'java'})
})
  .then((response) => {
    return response.json();
    
  })
  .then((myJson) => {

    console.log(myJson)
    myquestionArray = myJson.map(obj => ({...obj}));
   
  });

  console.log(myquestionArray)
  
 
const startInterview  = () =>{
  let tempArray = []
  tempArray = myquestionArray;
  let secondArray = [];
 
//   var secondArray = [tempArray.length-1];
let result
  function getRandome(min, max){
    let step1 = max - min + 1;
    let step2 = Math.random()* step1;
    result = Math.floor(step2)+ min;
    return result;
  }
  
  for(let i=0;i<=tempArray.length;i++)
  {
        let index = getRandome(0, tempArray.length-1);
        secondArray.push(tempArray[index]);
        tempArray.splice(index,1) 
  }


if(tempArray.length == 1)
{
  secondArray.push(tempArray[0]);
}
//Ask Question to User            

var i =0;
while(i<= secondArray.length-1){
  speak({text: secondArray[i].question});
  setInterval(setIsListening(prevState => !prevState), 30000)
  setQuestion({ question: secondArray[i].question });
  setAnswer({ answer: secondArray[i].answer });
  setrequiredWords({ requiredWords: secondArray[i].requiredWords });
  setTopic({ topic: secondArray[i].topic });
  if(flag===true){
    i++;
  }else{
    i--;
  }
 
} 
//End of Ask Question to User  
}

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()

      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
    
  }

  // const handleSaveNote = (e) => {
  //   setuserAnswer([...userAnswer, note])
  //   setNote('')
    
  // }
   const handleSaveNote = async (e) => {
     console.log(note)
      setuserAnswer([...userAnswer, note])
      setNote('')
    const Data = {
      topic: topic,
      answer: answer,
      question: question,
      userAnswer: userAnswer.toString(),
      requiredWords: requiredWords,
      testUUID: uuid()
    };
    console.log(Data);
    fetch('http://localhost:5000/technical/updateSingleTechnicalAccuracy', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
     body:JSON.stringify(Data)
    }).then((res) => {
          console.log(res.data);
          setTopic(topic)
          setAnswer(answer);
          setQuestion(question);
          setuserAnswer(userAnswer);
          setrequiredWords(requiredWords);
          
        })
        .catch((error) => {
          console.log(error);
        });
    // let newData = JSON.stringify(Data)
    // await axios
    //   .post("http://localhost:5000/technical/updateSingleTechnicalAccuracy", {
    //     method: 'POST',
    //     // headers: headers
    //   }, Data)
    //   .then((res) => {
    //     console.log(res.data);
    //     setTopic(topic)
    //     setAnswer(answer);
    //     setQuestion(question);
    //     setuserAnswer(userAnswer);
    //     setrequiredWords(requiredWords);
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
      flag = true;

  }
  

  return (
    <>
      <Navbar />

      <h1>Module 3</h1>
      <div className="group">
          <button onClick={() => startInterview()}>Start Interview</button>
        </div>
        <div className="group">
          <button onClick={() => skipValue = true }>Skip Question</button>
        </div>
      <div className="container">
      
        <div className="box">
          <h2>AI BOT NOTES</h2>
          {userAnswer.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
        <div className="group">
          <button onClick={() => speak({ text: userAnswer })}>Speech</button>
        </div>
        <div className="box">
          <h2>USER</h2>
          {isListening ? <span>🎙️Listenining...</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Submit Answer
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>user NOTES</h2>
          {userAnswer.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
        <div className="group">
          <button onClick={() => speak({ text: userAnswer })}>Speech</button>
        </div>

      </div>
    </>
  )
}

export default App
