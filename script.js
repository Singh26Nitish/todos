const apiUrl = 'http://localhost:3000/todos';

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();

    const form = document.getElementById('todo-form');
    form.addEventListener('submit', addTodo);
});

function fetchTodos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todo-list');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const todoItem = createTodoItem(todo);
                todoList.appendChild(todoItem);
            });
        });
}

function addTodo(event) {
    event.preventDefault();
    const input = document.getElementById('todo-input');
    const task = input.value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(todo => {
        const todoList = document.getElementById('todo-list');
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);
        input.value = '';
    });
}

function updateTodo(id, updatedData) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(updatedTodo => {
        fetchTodos();
    });
}

function deleteTodo(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(deletedTodo => {
        fetchTodos();
    });
}

function createTodoItem(todo) {
    const li = document.createElement('li');
    li.textContent = todo.task;
    li.className = todo.completed ? 'complete' : '';

    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeButton = document.createElement('button');
    completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
    completeButton.className = 'complete-btn';
    completeButton.addEventListener('click', () => {
        updateTodo(todo.id, { completed: !todo.completed });
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
    });

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);

    li.appendChild(actions);

    return li;
}
