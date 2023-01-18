import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app";
import { createRoot } from "react-dom/client";

// ReactDOM.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
