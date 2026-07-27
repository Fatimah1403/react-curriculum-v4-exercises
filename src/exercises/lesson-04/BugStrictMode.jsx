// TOPIC: StrictMode Effects and Cleanup
// TASK: Notice how the count increments incorrectly based on the `setInterval` logic. Fix the useEffect so that the counter increments correctly.

import { useEffect, useState } from 'react';

export default function BugStrictMode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalid = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(intervalid);
  }, []);

  return (
    <div>
      <h2>StrictMode Timer Bug</h2>
      <p>Count: {count}</p>
    </div>
  );
}

// Write your explanation of how StrictMode helps us catch this bug
// Strictmode intentionally mounts, unmounts, and remounts the component
// in developemnt, without a cleanup function each mounts starterd
// a setInterval and the old one kept running, - so two timers increamented count, making
// it jump by 2. Adding  `return () => clearInterval(intervalId)` stops the old timer on unmount, and using  `[]` sets the timer
// uponly at once. StrictMode helped us
// catch a missing cleanup that would cause leaks during navigation/re-renders.
