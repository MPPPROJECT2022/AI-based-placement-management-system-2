import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import store from "./store";



function index() {
  return (
    <>
      <Provider store={store}>
      <App />
    </Provider>
    </>
  )
}

export default index
// ReactDOM.render(
//   <React.StrictMode>
    // <Provider store={store}>
    //   <App />
    // </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
