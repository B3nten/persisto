import { usePersistantState } from "../../persisto/react.tsx";

export default function HomePage() {
  const [count, setCount] = usePersistantState("count", 0);
  console.log(count)
  return (
    <div>
      <div>The count is {count}</div>
      <button style={{marginRight: "4px"}} onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
