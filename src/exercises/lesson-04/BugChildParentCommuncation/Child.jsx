export default function Child({ onIncrement }) {
  return <button onClick={onIncrement}>Increment Counter</button>;
}
// Explanation:
// Child receives the increment function FROM Parent as a prop (called a callback prop)
// It does NOT manage any state itself — it just calls the parent's function when clicked
// This is the standard Child → Parent communication pattern in React
