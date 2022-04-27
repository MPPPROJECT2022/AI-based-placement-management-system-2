import React, { useEffect, useState, useRef } from "react";
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Components/Navbar';
import MainNavbar from './Components/MainNavbar'
import Axios from 'axios';
import spinner from './spinner.svg';
import { v4 as uuid } from 'uuid';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
const codeQuestions = ["fighting", "learning", "qwerty"]

const [testUUID, settestUUID] = useState('');
const [imageArray, setimageArray] = useState([])
const newArray = []
//Take Pictures using webcam __________Start________________________



let videoRef = useRef(null);
 
let photoRef = useRef(null)

const getVideo = () => {
  navigator.mediaDevices
	.getUserMedia({
	  video: true
	})
	.then((stream) => {
	  let video = videoRef.current;
	  video.srcObject = stream;
	  video.play();
	})
	.catch((err) => {
	  console.error(err);
	});
};
 

  const takePicture = () => {
    const width = 400;
    const height = width / (16 / 9);
    
    let video = videoRef.current
 
    let photo = photoRef.current
 
    photo.width = width
 
    photo.height = height

	let ctx = photo.getContext('2d')


    ctx.drawImage(video, 0, 0, width, height)
	console.log(ctx)
	newArray.push(ctx)
	setimageArray(newArray)
	// setimageArray( newArray => [...newArray, `${newArray.length}`]);
	// dataURL = canvas.toDataURL(outputFormat);
	// const imgblob = ctx.toBlob()
	// console.log(imgblob)
	


    
  }
 
  const clearImage = () => {
	let photo = photoRef.current
 
    let ctx = photo.getContext('2d')
 
    ctx.clearRect(0,0,photo.width,photo.height)

  }
  useEffect(() => {
    // getVideo()
	// Interval1()
	// Interval2()
	
  }, [videoRef]);

const Interval1 = () =>{
	const id1 = setInterval(takePicture, 10000)
  return () => clearInterval(id1)
}

const Interval2 = () =>{
	const id3 = setInterval(clearImage, 11000)
  return () => clearInterval(id3)
}

const savebtn = () =>{
	console.log(imageArray)
	// const Data = {
	// 	imageArray: imageArray,
	// 	userCode: userCode,
	// 	userInput: userInput,
	// 	userOutput: userOutput,
	// 	testUUID: uuid()
	//   };
	//   console.log(Data);
	//   fetch('Api', {
	// 	method: 'POST',
	// 	headers:{
	// 	  'Accept': 'application/json',
	// 	  'Content-type': 'application/json'
	// 	},
	//    body:JSON.stringify(Data)
	//   }).then((res) => {
	// 		console.log(res.data);
			
	// 	  })
	// 	  .catch((error) => {
	// 		console.log(error);
	// 	  });
}
  
  


//Take Pictures using webcam __________End________________________


//State Variable to display Questions Questions
const [index, setIndex] = useState(0);

useEffect(() => {
    const tick = () => setIndex(i => i + 1);

    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
// State variable to set users source code
const [userCode, setUserCode] = useState(``);

// State variable to set editors default language
const [userLang, setUserLang] = useState("python");

// State variable to set editors default theme
const [userTheme, setUserTheme] = useState("vs-dark");

// State variable to set editors default font size
const [fontSize, setFontSize] = useState(20);

// State variable to set users input
const [userInput, setUserInput] = useState("");

// State variable to set users output
const [userOutput, setUserOutput] = useState("");

// Loading state variable to show spinner
// while fetching data
const [loading, setLoading] = useState(false);

const options = {
	fontSize: fontSize
}

// Function to call the compile endpoint
function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}

	// Post request to compile endpoint
	Axios.post(`http://localhost:3000/compile`, {
	code: userCode,
	language: userLang,
	input: userInput }).then((res) => {
	setUserOutput(res.data.output);
	}).then(() => {
	setLoading(false);
	})
}

// Function to clear the output screen
function clearOutput() {
	setUserOutput("");
}

return (
	<>

<div className="container">
      <h1 className="text-center">Camera Selfie App in React</h1>
 
      <video ref={videoRef} className="container"></video>
 
      <button onClick={takePicture} className="btn btn-danger container">Take Picture</button>

	  <button onClick={savebtn} className="btn btn-secondary container">Save Array</button>
	  
      <canvas className="container" ref={photoRef}></canvas>
 
      <button onClick={clearImage} className="btn btn-primary container">Clear Image</button>
 
      <br/><br/>
    </div>
	
	<MainNavbar />
	<div className="App">
	<h1>{codeQuestions[index % codeQuestions.length]}</h1>
	<Navbar
	
		userLang={userLang} setUserLang={setUserLang}
		userTheme={userTheme} setUserTheme={setUserTheme}
		fontSize={fontSize} setFontSize={setFontSize}
	/>
	<div className="main">
		<div className="left-container">
		<Editor
			options={options}
			height="calc(100vh - 50px)"
			width="100%"
			theme={userTheme}
			language={userLang}
			defaultLanguage="python"
			defaultValue="# Enter your code here"
			onChange={(value) => { setUserCode(value) }}
		/>
		<button className="run-btn" onClick={() => compile()}>
			Run
		</button>
		</div>
		<div className="right-container">
		<h4>Input:</h4>
		<div className="input-box">
			<textarea id="code-inp" onChange=
			{(e) => setUserInput(e.target.value)}>
			</textarea>
		</div>
		<h4>Output:</h4>
		{loading ? (
			<div className="spinner-box">
			<img src={spinner} alt="Loading..." />
			</div>
		) : (
			<div className="output-box">
			<pre>{userOutput}</pre>
			<button onClick={() => { clearOutput() }}
				className="clear-btn">
				Clear
			</button>
			
			</div>
			
		)}
		<button onClick={() => { savebtn() }}
				className="clear-btn">
				Save
			</button>
		</div>
	</div>
	</div>
	</>
);
}

export default App;
