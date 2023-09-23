import { createSignal } from "solid-js";
import { defineSolidWebComponent } from "../utils";

export function Increment(props: { class?: string }) {
  const [count, setCount] = createSignal(0);

  return (
    <div class={`bg-gray-100 p-4 rounded-md shadow ${props.class || ''}`}>
      <p class="text-lg font-semibold mb-2">Count: {count()}</p>
      <button 
          onClick={() => setCount(count() + 1)}
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
      >
          Increment
      </button>
    </div>
  );
}

defineSolidWebComponent(Increment, 'increment-web-component')
