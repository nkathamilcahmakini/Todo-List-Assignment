const todoContainer = document.getElementById('todos');
const addTodoForm = document.getElementById('addTodoForm');
const todoInput = document.getElementById('todoInput');
let todos = [];
const getTodos = () => {
  return fetch('https://dummyjson.com/todos/user/5')
    .then(response => response.json())
    .then(response => {
      todos = response.todos;
      return todos;
    });
};
const displayTodos = () => {
  todoContainer.innerHTML = '';
  todos.forEach(item => {
    const div = document.createElement('div');
    const todo = document.createElement('h2');
    const completed = document.createElement('p');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');
    todo.innerHTML = item.todo;
    completed.innerHTML = `Task completed: ${item.completed}`;
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    deleteButton.textContent = 'Delete';
    checkbox.addEventListener('change', () => updateTodo(item.id, checkbox.checked));
    deleteButton.addEventListener('click', () => deleteTodo(item.id));
    div.appendChild(todo);
    div.appendChild(completed);
    div.appendChild(checkbox);
    div.appendChild(deleteButton);
    div.setAttribute('key', item.id);
    div.setAttribute('class', 'todo');
    if (item.completed) {
      div.style.backgroundColor = '#495057';
    } else {
      div.style.backgroundColor = '#eebefa';
    }
    todoContainer.appendChild(div);
  });
};
const addTodo = () => {
  const todo = todoInput.value;
  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo,
      completed: false,
      userId: 5,
    }),
  })
    .then(response => response.json())
    .then(response => {
      if (response.completed) {
        updateTodo(response.id, true);
      }
      todos.push(response);
      displayTodos();
      todoInput.value = '';
    })
    .catch(error => {
      console.error('Error adding todo:', error);
    });
};
const updateTodo = (todoId, completed) => {
  const updatedTodo = todos.find(item => item.id === todoId);
  if (updatedTodo) {
    updatedTodo.completed = completed;
    fetch(`https://dummyjson.com/todos/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    })
      .then(response => {
        const updatedIndex = todos.findIndex(item => item.id === todoId);
        if (updatedIndex !== -1) {
          todos[updatedIndex] = updatedTodo;
        }
        displayTodos();
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  }
};
const deleteTodo = todoId => {
  fetch(`https://dummyjson.com/todos/1`, {
    method: 'DELETE',
  })
    .then(() => {
      todos = todos.filter(item => item.id !== todoId);
      displayTodos();
    })
    .catch(error => {
      console.error('Error deleting todo:', error);
    });
};
addTodoForm.addEventListener('submit', x => {
  x.preventDefault();
  addTodo();
});
getTodos()
  .then(() => {
    displayTodos();
  });














