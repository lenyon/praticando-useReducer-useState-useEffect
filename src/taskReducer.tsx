type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type State = {
  tasks: Task[];
};

type Actions =
  | { type: "ADD_TASK"; text: string }
  | { type: "TOGGLE_TASK"; id: number }
  | { type: "REMOVE_TASK"; id: number }
  | { type: "LOAD_TASKS"; tasks: Task[] };

export const initialState: State = {
  tasks: [{ id: Date.now(), text: "primeira task", completed: true }],
};

export function taskReducer(state: State, payload: Actions) {
  switch (payload.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: payload.text, completed: false },
        ],
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.id === payload.id
              ? { ...task, completed: !task.completed }
              : task,
          ),
        ],
      };

    case "REMOVE_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== payload.id)],
      };
    default:
      return state;
  }
}
