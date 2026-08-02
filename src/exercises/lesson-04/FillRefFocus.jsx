// TOPIC: Correct useRef usage to control DOM elements
// TASK: Implement focusing an input field when the button is clicked.
import { useRef } from 'react';

export default function FillRefFocus() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <h2>useRef: Focusing an Input</h2>

      <input ref={inputRef} type="text" placeholder="Type here..." />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Explanation:
// WHY useRef here, not useState?
// We don't need to store a value or trigger a re-render.
// We just need a direct reference to the actual DOM input element
// so we can call .focus() on it imperatively.
// useRef gives us that direct line to the DOM without causing re-renders.
