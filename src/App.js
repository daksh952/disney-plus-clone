import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path ="/detail/:id" element={<Detail/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
