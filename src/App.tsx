import { useEffect, useReducer, useState } from "react";
import { initialState, taskReducer } from "./taskReducer";

function App() {
  const [task, setTask] = useState("");
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const visibleTasks = state.tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // all
  });

  function handleAddTask() {
    const hasTask = task.trim();
    if (!hasTask) {
      alert("Digite uma tarefa para ser adicionada!");
      return;
    }
    dispatch({ type: "ADD_TASK", text: task });
    setTask(" ");
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
          value={task}
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

      <div className="relative rounded-md bg-zinc-600 p-2 min-w-md items-center">
        {visibleTasks.map((task) => (
          <ul key={task.id} className="text-neutral-50 m-4 ">
            <li className="flex justify-between ">
              <div className="relative items-center flex truncate">
                {task.completed ? <span>✅</span> : <span>🚫 </span>} -{" "}
                <span>{task.text}</span>
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-md bg-amber-400 py-1 px-2"
                  onClick={() => dispatch({ type: "TOGGLE_TASK", id: task.id })}
                >
                  concluir/desfazer
                </button>
                <button
                  className="rounded-md bg-amber-400 py-1 px-2"
                  onClick={() => dispatch({ type: "REMOVE_TASK", id: task.id })}
                >
                  remover
                </button>
              </div>
              <div>
                <button
                  className="rounded-md bg-amber-400 py-1 px-2"
                  onClick={() => {
                    setFilter("all");
                  }}
                >
                  Todas
                </button>
                <button
                  className="rounded-md bg-amber-400 py-1 px-2"
                  onClick={() => {
                    setFilter("completed");
                  }}
                >
                  Completas
                </button>
                <button
                  className="rounded-md bg-amber-400 py-1 px-2"
                  onClick={() => {
                    setFilter("pending");
                  }}
                >
                  Pendentes
                </button>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
