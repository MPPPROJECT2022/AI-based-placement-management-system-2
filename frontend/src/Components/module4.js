import React, { useState, useEffect } from 'react'
import './module3.css'
import { useSpeechSynthesis } from "react-speech-kit"
import Navbar from './MainNavbar';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [userGDAnswer, setuserGDAnswer] = useState(null)
  const { speak, voices } = useSpeechSynthesis();
  let bot1 = voices[1];
  let bot2 = voices[7];
  let bot3 = voices[3];
  useEffect(() => {
    handleListen()
  }, [isListening])

 

  var flagListen = false;

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        flagListen = true;
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

 
  // var handleSaveNote = async (e) => {
  //   // setuserGDAnswer([...userGDAnswer, note])
  //   // setNote('')
  //   RandomSelectSentences().runBot();
  // }
// 

// const sampleArray = [
//   {name:"bot1",data:"This is the first sentences"},
//   {name:"bot2",data:"This is the second sentences"},
//   {name:"bot3",data:"This is the third sentences"},
  
  
//   {name:"bot1",data:"This is the fourth sentences"},
//   {name:"bot2",data:"This is the fifth sentences"},
//   {name:"bot3",data:"This is the sixth sentences"},
  
  
//   {name:"bot1",data:"This is the seventh sentences"},
//   {name:"bot2",data:"This is the eighth sentences"},
//   {name:"bot3",data:"This is the ninth sentences"},

  
// ]


// const [arr,arrSet] = useState(array_value);
// ...
// let newArr = [...arr];
//   arr.map((data,index) => {
//     newArr[index].somename= new_value;
//   });
// arrSet(newArr);
// const FetchSentences = () => {
//   fetch('http://localhost:5000/GD/getSentencesToSpeak', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ topic: "India", testUUID: "testUUID"})
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((myJson) => {
//       myNewArray = myJson.map(obj => ({ ...obj }));
//       console.log(myNewArray)
//     });

// }
// const [thirdArray, setthirdArray] = useState(sampleArray);
async function botsWillSpeak(){
  let flagb1 = false;
  let flagb2=false;
  let flagb3=false;
await fetch('http://localhost:5000/GD/getSentencesToSpeak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic: "India", testUUID: "testUUID"})
  })
    .then((response) => {
      return response.json();
    }) .then((myJson) => {
      myNewArray = myJson;
      // myNewArray = myJson.map(obj => ({ ...obj }));
      console.log(myNewArray)
    });
  for(let i=0;i<3;i++)
  {
    
      if(flagb1===false)
      {
        speak({ text: myNewArray[i], voice: bot1 });
        console.log(myNewArray)      
        flagb1 = true;
      }
      else if(flagb2===false)
      {
        speak({ text: myNewArray[i], voice: bot2 });
        flagb2 = true;
        console.log(myNewArray)

      }
      else if(flagb3===false)
      {
        speak({ text: myNewArray[i], voice: bot3 });
        flagb3 = true;
        console.log(myNewArray)
      }
  }
  userWillSpeak();
}
function userWillSpeak(){
  setIsListening(prevState => !prevState)
}

//There will be a button in html

function onclick(){
  // setthirdArray( secondArray => [...secondArray.splice(0,3), `${secondArray.length}`]);
  botsWillSpeak()
 
}


  //fetch Sentences
  var myNewArray = [];
  let tempArray = [];
  let secondArray = [];



 
  //select Sentences Randomly
  // const RandomSelectSentences = () => {

    
    
  //   tempArray = myNewArray;

  //   //   var secondArray = [tempArray.length-1];
  //   let result
  //   function getRandome(min, max) {
  //     let step1 = max - min + 1;
  //     let step2 = Math.random() * step1;
  //     result = Math.floor(step2) + min;
  //     return result;
  //   }

  //   for (let i = 0; i <= tempArray.length; i++) {
  //     let index = getRandome(0, tempArray.length - 1);
  //     secondArray.push(tempArray[index]);
  //     tempArray.splice(index, 1)
  //   }


  //   if (tempArray.length == 1) {
  //     secondArray.push(tempArray[0]);
  //   }
  //   console.log(secondArray)

  //   //select Sentences Randomly

  //   //Ask Question to User

  //   // var flagb1 = false;
  //   // var flagb2 = false;
  //   // var flagb3 = false;
  //   // const runBot = async () => {
  //   //   for (let j = 0; j <= secondArray[0].sentences.length - 1; j++) {
  //   //     if (flagb1 === false) {
  //   //       await speak({ text: secondArray[0].sentences[j], voice: bot1 });
  //   //       flagb1 = true;
  //   //     }
  //   //     else if (flagb2 === false) {
  //   //       await speak({ text: secondArray[0].sentences[j], voice: bot2 });
  //   //       flagb2 = true;
  //   //     }
  //   //     else if (flagb3 === false) {
  //   //       await speak({ text: secondArray[0].sentences[j], voice: bot3 });
  //   //       flagb3 = true;
  //   //     }else{
  //   //       speak({ text: "what is your concern?", voice: bot2 });
  //   //       setIsListening(prevState => !prevState)
  //   //       break;
  //   //     }

  //   //   }      
      
  //   // }
  //   // runBot();

  //   // var flagb1 = false;
  //   // var flagb2 = false;
  //   // var flagb3 = false;

  //   // for (var j = 0; j < secondArray[0].sentences.length; j++) {
  //   //     if (flagb1 === false) {
  //   //       speak({ text: secondArray[0].sentences[j], voice: bot1 });
  //   //       flagb1 = true;

  //   //     }
  //   //     else if (flagb2 === false) {
  //   //       speak({ text: secondArray[0].sentences[j], voice: bot2 });
  //   //       flagb2 = true;

  //   //     }
  //   //     else if (flagb3 === false) {
  //   //       speak({ text: secondArray[0].sentences[j], voice: bot3 });
  //   //       flagb3 = true;
  //   //       var refreshIntervalId = setInterval(setIsListening(prevState => !prevState), 30000)
  //   //       if (j == 2) {
  //   //         clearInterval(refreshIntervalId);
  //   //       }
  //   //     } else {
  //   //       speak({ text: 'user tern' })
  //   //     }

  //   // }
        
    
   
  
  

  return (
    <>
      <Navbar />
      <h1>Group Descussion</h1>
      {/* <button onClick={FetchSentences}>Get Data</button> */}
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={()=>{  onclick(); setIsListening(prevState => !prevState);}}>
            Start/Stop
            
          </button>
          <p>{note}</p>
        </div>
        <div className="group">
          <button onClick={botsWillSpeak}>Start Interview</button>
        </div>
      </div>
    </>
  )
}

export default App