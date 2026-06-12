const todoModel = require('../models/todoModel');

const listTodos = (req, res) => {
    res.status(200).json(todoModel.list());
};

const findTodo = (req, res) => {
    const todo = todoModel.find(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
};

const createTodo = (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: 'task is missing' });
    res.status(201).json(todoModel.create(task));
};

const updateTodo = (req, res) => {
    const todo = todoModel.update(req.params.id, req.body);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
};

const deleteTodo = (req, res) => {
    const deleted = todoModel.destroy(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.status(204).send();
};

module.exports = { listTodos, findTodo, createTodo, updateTodo, deleteTodo };