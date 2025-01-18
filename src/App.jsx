import React, { useState, useCallback, useEffect,useRef } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(100);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const generator = useCallback(() => {
    let passw = "";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (number) string += "0123456789";
    if (char) string += "?'/}{[]@#$%^&*()*+,-./";

    for (let i = 1; i <= count; i++) {
      const randomIndex = Math.floor(Math.random() * string.length);
      passw += string.charAt(randomIndex);
    }

    setPassword(passw); // Update state after generating the password
  }, [count, number, char]);
  
let copyclipboard= useCallback(() => {
  password.current?Select():
  window.navigator.clipboard.writeText(password);
  },[password]
)


  useEffect(() => {
    generator(); // Regenerate the password when dependencies change
  }, [count, number, char, generator]);

  return (
    <>
      <h1>Password Generator</h1>
      <div>
        <input type="text" className='inp' value={password} readOnly />
        <button onClick={() =>copyclipboard()}>Copy</button>
      </div>

      <label htmlFor="char">Include Special Characters</label>
      <input
        type="checkbox"
        id="char"
        onChange={() => setChar((prev) => !prev)}
      />

      <label htmlFor="range">Password Length: {count}</label>
      <input
        type="range"
        min={6}
        max={100}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />

      <label htmlFor="num">Include Numbers</label>
      <input
        type="checkbox"
        id="num"
        onChange={() => setNumber((prev) => !prev)}
      />
    </>
  );
}

export default App;
