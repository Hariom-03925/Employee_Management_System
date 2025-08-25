const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (error) {
        console.error('Get employees error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Get employee error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new employee
router.post('/', [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').trim().isLength({ min: 1 }).withMessage('Phone is required'),
    body('department').isIn(['Engineering', 'Marketing', 'HR', 'Sales', 'Finance', 'Operations']).withMessage('Valid department is required'),
    body('status').isIn(['Active', 'Inactive']).withMessage('Valid status is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        console.error('Create employee error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Update employee
router.put('/:id', [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').trim().isLength({ min: 1 }).withMessage('Phone is required'),
    body('department').isIn(['Engineering', 'Marketing', 'HR', 'Sales', 'Finance', 'Operations']).withMessage('Valid department is required'),
    body('status').isIn(['Active', 'Inactive']).withMessage('Valid status is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        console.error('Update employee error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Delete employee error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Search employees
router.get('/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const employees = await Employee.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { department: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        
        res.json(employees);
    } catch (error) {
        console.error('Search employees error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
