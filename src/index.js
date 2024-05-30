const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Add this line
app.use(express.json());

let todos = [];

app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send('Task is required');
    }

    const newTodo = {
        id: todos.length + 1,
        task,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).send('Todo not found');
    }

    res.json(todo);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).send('Todo not found');
    }

    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).send('Todo not found');
    }

    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
