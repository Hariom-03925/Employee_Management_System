const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedEmployee', 'name email').sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedEmployee', 'name email');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new task
router.post('/', [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
    body('assignedEmployee').isMongoId().withMessage('Valid employee ID is required'),
    body('priority').isIn(['High', 'Medium', 'Low']).withMessage('Valid priority is required'),
    body('deadline').isISO8601().withMessage('Valid deadline date is required'),
    body('status').isIn(['Pending', 'In Progress', 'Completed']).withMessage('Valid status is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Get employee name
        const employee = await Employee.findById(req.body.assignedEmployee);
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        const taskData = {
            ...req.body,
            assignedEmployeeName: employee.name
        };

        const task = new Task(taskData);
        await task.save();
        
        const populatedTask = await Task.findById(task._id).populate('assignedEmployee', 'name email');
        res.status(201).json(populatedTask);
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update task
router.put('/:id', [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
    body('assignedEmployee').isMongoId().withMessage('Valid employee ID is required'),
    body('priority').isIn(['High', 'Medium', 'Low']).withMessage('Valid priority is required'),
    body('deadline').isISO8601().withMessage('Valid deadline date is required'),
    body('status').isIn(['Pending', 'In Progress', 'Completed']).withMessage('Valid status is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Get employee name
        const employee = await Employee.findById(req.body.assignedEmployee);
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        const taskData = {
            ...req.body,
            assignedEmployeeName: employee.name
        };

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            taskData,
            { new: true, runValidators: true }
        ).populate('assignedEmployee', 'name email');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get tasks by employee
router.get('/employee/:employeeId', async (req, res) => {
    try {
        const tasks = await Task.find({ assignedEmployee: req.params.employeeId })
            .populate('assignedEmployee', 'name email')
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error('Get tasks by employee error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get tasks by status
router.get('/status/:status', async (req, res) => {
    try {
        const tasks = await Task.find({ status: req.params.status })
            .populate('assignedEmployee', 'name email')
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error('Get tasks by status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
