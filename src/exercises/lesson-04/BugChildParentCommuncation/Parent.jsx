import { useState } from 'react';
import Child from './Child';

export default function Parent() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>Parent-Child Communication</h2>
      <p>Counter: {count}</p>
      <Child onIncrement={increment} />
    </div>
  );
}
// Explanation:
//  WHY does state live in Parent and not Child?
// Because Parent owns the counter display. If Child managed the state,
// Parent would never know the count changed and couldn't show it.
// Lifting state up to the common owner (Parent) and passing callbacks down is
// the React way of sharing state between components.
