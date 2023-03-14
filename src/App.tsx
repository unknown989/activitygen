import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [card, setCard] = useState(<Card />);
  return (
    <div className="App">
      <div className="container">
        {card}
        <button
          className="button"
          onClick={() => {
            setCard(<></>);
            setCard(<Card key={Math.round(Math.random() * 10000)} />);
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default App;
