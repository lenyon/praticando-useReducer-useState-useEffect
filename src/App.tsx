import { useEffect, useReducer, useState } from "react";
import { initialState, taskReducer } from "./taskReducer";

function App() {
  const [task, setTask] = useState("");
  const [state, dispatch] = useReducer(taskReducer, initialState);

  function handleAddTask() {
    const hasTask = task.trim();
    if (!hasTask) {
      alert("Digite uma tarefa para ser adicionada!");
      return;
    }
    dispatch({ type: "ADD_TASK", text: task });
    setTask("");
  }
  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  useEffect(() => {
    const taskslist = localStorage.getItem("tasksList");

    if (taskslist) {
      dispatch({ type: "LOAD_TASKS", tasks: JSON.parse(taskslist) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <div className="flex flex-col justify-center items-center min--w-screen min-h-screen gap-2">
      <div className="flex justify-between min-w-md gap-2">
        <input
          type="text"
          onChange={handleInputValue}
          className="rounded-lg bg-zinc-600 text-neutral-50 p-2 flex-1"
        />
        <button
          onClick={handleAddTask}
          className="rounded-lg bg-zinc-950  text-neutral-50 p-2"
        >
          Adicionar Task
        </button>
      </div>

      <div className="rounded-md bg-zinc-600 p-2 min-w-md">
        {state.tasks.map((task) => (
          <ul key={task.id} className="text-neutral-50 list-disc">
            <li>
              {task.text}
              {task.completed ? <span>✅</span> : <span>🚫</span>}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
