const root = document.querySelector('.todoapp');

// main
const main = document.createElement('section');
main.className = 'main';

const toggleAllContainer = document.createElement('span');
toggleAllContainer.className = 'toggle-all-container';

const toggleAllCheckbox = document.createElement('input');
toggleAllCheckbox.id = 'toggle-all';
toggleAllCheckbox.className = 'toggle-all';
toggleAllCheckbox.type = 'checkbox';
toggleAllCheckbox.checked = false;

const toggleAllLabel = document.createElement('label');
toggleAllLabel.htmlFor = 'toggle-all';

const list = document.createElement('ul');
list.className = 'todo-list';

root.appendChild(main);
main.appendChild(toggleAllContainer);
toggleAllContainer.appendChild(toggleAllCheckbox);
toggleAllContainer.appendChild(toggleAllLabel);
toggleAllContainer.appendChild(list);

// li
const listItem = document.createElement('li');
listItem.className = 'todo-list__item';

const viewDiv = document.createElement('div');

const todoCheckbox = document.createElement('input');
todoCheckbox.className = 'toggle';
todoCheckbox.type = 'checkbox';
todoCheckbox.checked = false;

const todoLabel = document.createElement('label');
todoLabel.className = 'todo-title';

const deleteTodoButton = document.createElement('button');
deleteTodoButton.className = 'destroy';

const editInput = document.createElement('input');
editInput.type = 'text';
editInput.className = 'edit-field invisible';

listItem.appendChild(viewDiv);
viewDiv.appendChild(todoCheckbox);
viewDiv.appendChild(todoLabel);
viewDiv.appendChild(deleteTodoButton);
viewDiv.appendChild(editInput);

// footer
const infoBlock = document.createElement('footer');
infoBlock.className = 'footer';

const todoCount = document.createElement('span');
todoCount.innerText = 'items left';

const filtersList = document.createElement('ul');
filtersList.className = 'filters';

const filterItem1 = document.createElement('li');
const filterItem2 = document.createElement('li');
const filterItem3 = document.createElement('li');

const filterLinkAll = document.createElement('a');
filterLinkAll.dataset.type = 'filter';
filterLinkAll.dataset.filter = 'all';
filterLinkAll.href = '#/';

const filterLinkActive = document.createElement('a');
filterLinkActive.dataset.type = 'filter';
filterLinkActive.dataset.filter = 'active';
filterLinkActive.href = '#/active';

const filterLinkCompleted = document.createElement('a');
filterLinkCompleted.dataset.type = 'filter';
filterLinkCompleted.dataset.filter = 'active';
filterLinkCompleted.href = '#/active';

const clearCompletedButton = document.createElement('button');
clearCompletedButton.className = 'clear-completed';
clearCompletedButton.innerText = 'Clear completed';

infoBlock.appendChild(todoCount);
infoBlock.appendChild(filtersList);
filtersList.appendChild(filterItem1);
filterItem1.appendChild(filterLinkAll);
filtersList.appendChild(filterItem2);
filterItem2.appendChild(filterLinkActive);
filtersList.appendChild(filterItem3);
filterItem3.appendChild(filterLinkCompleted);
infoBlock.appendChild(clearCompletedButton);

// New Todo Input
const header = document.createElement('header');
header.className = 'header';

const appTitle = document.createElement('h1');
appTitle.innerText = 'todos';

const newTodoInput = document.createElement('input');
newTodoInput.className = 'new-todo';
newTodoInput.placeholder = 'What needs to be done?';

header.appendChild(appTitle);
header.appendChild(newTodoInput);

// Modal
const modal = document.createElement('div');
modal.className = 'modal';

const modalContentDiv = document.createElement('div');
modalContentDiv.className = 'modal__content';

const modalCloseButton = document.createElement('button');
modalCloseButton.className = 'modal__close-button';

const modalTitle = document.createElement('p');
modalTitle.className = 'modal__title';
modalTitle.innerText = 'Are you sure You want to delete this task?';

const buttonsContainer = document.createElement('div');
buttonsContainer.className = 'button-container';

const deleteButton = document.createElement('button');
deleteButton.className = 'modal__button--delete';
deleteButton.innerText = 'Delete';

const cancelButton = document.createElement('button');
cancelButton.className = 'modal__button--delete';
cancelButton.innerText = 'Cancel';

modal.appendChild(modalContentDiv);
modalContentDiv.appendChild(modalCloseButton);
modalContentDiv.appendChild(modalTitle);
modalContentDiv.appendChild(buttonsContainer);
buttonsContainer.appendChild(deleteButton);
buttonsContainer.appendChild(cancelButton);
