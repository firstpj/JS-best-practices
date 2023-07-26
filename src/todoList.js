let todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
const getTodoList = () => todoList;
const saveTodoList = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};
const addItem = (task) => {
  if (task) {
    const taskItem = {
      description: task,
      completed: false,
    };
    todoList.push(taskItem);
    saveTodoList();
  }
};
const markCompleted = (itemIndex) => {
  if (itemIndex >= 0 && itemIndex < todoList.length) {
    todoList[itemIndex].completed = true;
    saveTodoList();
  }
};
const removeItem = (index) => {
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
};
const removeCompletedItems = () => {
  todoList = todoList.filter((item) => !item.completed);
  saveTodoList();
};
const editItem = (index, description) => {
  todoList[index].description = description;
  saveTodoList();
};
export {
  getTodoList, addItem, markCompleted, removeItem, removeCompletedItems, editItem,
};