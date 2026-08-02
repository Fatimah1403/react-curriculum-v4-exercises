// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render
import { useState } from 'react';

export default function FindCorrectHook() {
  // let clickCount = 0; // ← incorrect implementation
  const [clickCount, setClickCount] = useState(0); // ← correct implementation
  function handleClick() {
    setClickCount(clickCount + 1);
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button onClick={handleClick}>{clickCount} Clicks</button>
    </div>
  );
}
// Explanation:
// The correct implemantation was useState not useRef
// because useRef changes do not cause re-renders, so the button text
// would never update. we want the UI to update when clicks, so use State is the
//  right choice.
// Note: If the value needs to show up on the screen --- useState,
// if it's just internal tracking - ueseRef.
