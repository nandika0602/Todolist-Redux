import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    //state
    count: 0,
    taskName: "",
    lists: [],
    editTask: null,
    error: "",
    isEdit: null,
  },
  reducers: {
    //action name: (state, action) => {
    //modify the state
    // }
    addCount: (state, action) => {
      //   console.log(state, state.count, action);
      state.count += action.payload;
    },
    taskNameValue: (state, action) => {
      //   console.log(action.payload, "from red");
      state.taskName = action.payload;
    },
    addTask: (state, action) => {
      console.log("coming");
      if (!state.taskName.trim()) {
        state.error = "Please enter any task. Task should not be empty";
      } else if (state.editTask) {
        // console.log(state.isEdit, 'isedit', state.taskName, 'state-task');
        if (state.isEdit !== state.taskName) {
          const updatedList = state.lists.map((list) => {
            if (list.id === state.editTask) {
              return { ...list, task: state.taskName };
            }
            return list;
          });

          //   state.lists = [...state.lists, { ...updatedList }];
          state.lists = [...updatedList];
          console.log(state.lists);

          //   console.log(JSON.parse(JSON.stringify(updatedList)), 'up');
          //   console.log(updatedList, 'up');
          //   const updatedObject = JSON.parse(JSON.stringify(updatedList))
          //   const stateList = JSON.parse(JSON.stringify(state.lists))
          //   console.log(stateList, updatedObject);
          // stateList.length = 0;
          // stateList.push([...stateList, ...updatedObject])
          //   console.log(stateList);
          //
          //   const k = {...updatedList}
          //   console.log(JSON.parse(k), 'k');
          //   console.log(state.lists, 'li');
          //   state.lists = []
          //   state.lists = [...state.lists, updatedObject]
          // console.log(state.lists, 'state-list');
          //   state.lists.push(updatedObject)
          state.editTask = null;
          state.taskName = "";
          state.isEdit = null;
          //   setLists(updatedList)
          //   setEditTask(null)
          //   setTaskName('')
        } else {
          // state.error = "You didn't update anything"
          alert("You didn't update anything");
        }
      } else {
        console.log("is it?");
        state.error = "";
        const duplicate = state.lists.filter(
          (li) => li.task === state.taskName
        );
        if (!duplicate.length) {
          state.lists.push({
            id: new Date().getTime(),
            task: state.taskName,
          });
          // console.log(state.lists[0], "lists");
          state.taskName = "";
        } else {
          alert("This task is already there, try to add new task");
        }
      }
    },
    updateList: (state, action) => {
      // console.log('update', action.payload);
      state.isEdit = action.payload.task;
      state.taskName = action.payload.task;
      state.editTask = action.payload.id;
    },
    deleteList: (state, { payload }) => {
      console.log(payload);
      if (state.editTask !== payload) {
        const filteredList = state.lists.filter((list) => {
          console.log(list, payload, list.id !== payload);
          return list.id !== payload;
        });
        console.log(filteredList);
        state.lists = [...filteredList];
      } else {
        alert("You can't delete this task, as it is in edit mode")
      }
    },
  },
});

export const { addCount, taskNameValue, addTask, updateList, deleteList } =
  todoSlice.actions;
export default todoSlice.reducer;
