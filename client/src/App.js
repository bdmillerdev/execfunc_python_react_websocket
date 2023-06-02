import React, { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Select from "./pages/Select";
import "./App.css";

// *** Dev config socket1
// const ENDPOINT1 = "http://localhost:4010";
// *** Prod config socket1
const ENDPOINT1 = "https://www.execfunc.com:4010"; 
const socket1 = io(ENDPOINT1);

// *** Dev config socket2
// const ENDPOINT2 = "http://localhost:4050"; // port
// *** Prod config socket2
const ENDPOINT2 = "https://www.execfunc.com:4050";
const socket2 = io(ENDPOINT2);

const foo = "foo";

function App() {
  const [header, setHeader] = useState("");
  const [sock, setSock] = useState();
  return (
    <Router>
      <div className="App">
        <></>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/select"
            element={
              <Select
                sock={sock}
                setSock={setSock}
                header={header}
                setHeader={setHeader}
                socket1={socket1}
                socket2={socket2}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <Chat
                username={foo}
                sock={sock}
                setSock={setSock}
                header={header}
                setHeader={setHeader}
                room={"testRoom"}
                socket1={socket1}
                socket2={socket2}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
