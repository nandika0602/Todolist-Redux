import { ADD_TASK } from "./type";

const initialState = {
  count: 0,
  taskName: "",
  lists: [],
  editTask: null,
  error: "",
  isEdit: null,
};

const reducer = (state = initialState, action) => {
  //   console.log(state, "reducer");
  if (action.type === "INC_COUNT") {
    return { ...state, count: state.count + action.value };
  }

  if (action.type === "SET_NAME") {
    // console.log("hello");
    return { ...state, taskName: action.payload };
  }

  if (action.type === ADD_TASK) {
    if (!state.taskName.trim()) {
      return {
        ...state,
        error: "Please enter any task. Task should not be empty",
      };
    } else if (state.editTask) {
      if (state.isEdit !== state.taskName) {
        // console.log(state.isEdit, state.taskName);
        const updatedList = state.lists.map((list) => {
          //   console.log(list.id, state.editTask, "31");
          if (list.id === state.editTask) {
            // console.log(
            //   { ...list, task: state.taskName },
            //   state.taskName,
            //   "task"
            // );
            return { ...list, task: state.taskName };
          }
        //   console.log(list, "task", "updatedList");
          return list;
        });
        // console.log(updatedList, "updatedList");
        return {
          ...state,
          lists: [...updatedList],
          editTask: null,
          taskName: "",
          isEdit: null,
        };
      } else {
        alert("You didn't update anything");
      }
    } else {
    //   console.log("is it?");
      state.error = "";
    //   console.log("yes", state.lists);
      const duplicate = state.lists.filter((li) => li.task === state.taskName);
      if (!duplicate.length) {
        // console.log(state.lists);
        return {
          ...state,
          lists: [
            ...state.lists,
            { id: new Date().getTime(), task: state.taskName },
          ],
          taskName: "",
        };
      } else {
        alert("This task is already there, try to add new task");
      }
    }
  }

  if (action.type === "UPDATE_LIST") {
    // console.log("update", action.payload);
    return {
      ...state,
      isEdit: action.payload.task,
      taskName: action.payload.task,
      editTask: action.payload.id,
    };
  }

  if (action.type === "DELETE_LIST") {
    // console.log(action.payload);
    if (state.editTask !== action.payload) {
      const filteredList = state.lists.filter((list) => {
        // console.log(list, action.payload, list.id !== action.payload);
        return list.id !== action.payload;
      });
    //   console.log(filteredList);
      return { ...state, lists: [...filteredList] };
    } else {
      alert("You can't delete this task, as it is in edit mode");
    }
  }
  return state;
};

export default reducer;
