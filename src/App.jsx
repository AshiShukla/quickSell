import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";
import React from "react";
function App() {
  return (
    <main className="main">
      <section className="main_header">
        <Header />
      </section>
      <section className="main_board">
        <Board />
      </section>
    </main>
  );
}

export default App;
