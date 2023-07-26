import {
  getTodoList, markCompleted, removeItem, editItem,
} from './todoList.js';

const listContainer = document.querySelector('.list');
const displayToDoList = (todoList) => {
  listContainer.innerHTML = '';
  todoList.forEach((item, index) => {
    const listItem = document.createElement('div');
    listItem.className = 'list-properties';
    listItem.innerHTML = `
          <div class="both-sides">
            <span class="left-items">
              <input type="checkbox" ${item.completed ? 'checked' : ''} data-index="${index}">
              <input type="text" value="${item.description}" class="input2">
            </span>
            <span class="right-items">
              <div class="edit-item" data-index="${index}"></div>
              <div class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></div>
            </span>
          </div>
          <hr class="line-1">
        `;
    const checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.addEventListener('change', (event) => {
      const index = event.target.getAttribute('data-index');
      markCompleted(index);
      displayToDoList(getTodoList());
    });
    const description = listItem.querySelector('input[type="text"]');
    description.addEventListener('input', (event) => {
      const index = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').getAttribute('data-index');
      editItem(index, event.target.value);
    });
    description.addEventListener('blur', (event) => {
      const index = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').getAttribute('data-index');
      editItem(index, event.target.value);
      description.setAttribute('readonly', true);
      displayToDoList(getTodoList());
    });
    const editButton = listItem.querySelector('.edit-item');
    editButton.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      const descriptionInput = listItem.querySelector('input[type="text"]');
      descriptionInput[index].removeAttribute('readonly');
      descriptionInput[index].focus();
    });
    const removeButton = listItem.querySelector('.remove-item');
    removeButton.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      removeItem(index);
      displayToDoList(getTodoList());
    });
    listContainer.appendChild(listItem);
  });
};
export default displayToDoList;
