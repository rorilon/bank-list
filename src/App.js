import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BankForm from './components/BankForm';
import Store from "./components/Store";

class App extends Component {
  render() {
    return (
        <Store/>
    );
  }
}

export default App;
