// Employee Management System - JavaScript
class EmployeeManagementSystem {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.employees = [];
        this.tasks = [];
        this.currentEditingEmployee = null;
        this.currentEditingTask = null;
        this.currentConfirmAction = null;

        // Wait for DOM to be ready before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing EMS...');
        this.loadSampleData();
        this.bindEvents();
        this.checkAuth();
    }

    loadSampleData() {
        // Load sample employees
        this.employees = [
            {
                id: 1,
                name: "John Doe",
                email: "john.doe@company.com",
                phone: "+1-234-567-8901",
                department: "Engineering",
                status: "Active",
                createdAt: "2024-01-15"
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@company.com",
                phone: "+1-234-567-8902",
                department: "Marketing",
                status: "Active",
                createdAt: "2024-01-20"
            },
            {
                id: 3,
                name: "Mike Johnson",
                email: "mike.johnson@company.com",
                phone: "+1-234-567-8903",
                department: "HR",
                status: "Inactive",
                createdAt: "2024-01-25"
            }
        ];

        // Load sample tasks
        this.tasks = [
            {
                id: 1,
                title: "Develop User Authentication",
                description: "Implement JWT-based authentication system for the application",
                assignedEmployee: 1,
                assignedEmployeeName: "John Doe",
                priority: "High",
                deadline: "2024-02-15",
                status: "In Progress",
                createdAt: "2024-01-10"
            },
            {
                id: 2,
                title: "Marketing Campaign Analysis",
                description: "Analyze the effectiveness of the Q1 marketing campaigns",
                assignedEmployee: 2,
                assignedEmployeeName: "Jane Smith",
                priority: "Medium",
                deadline: "2024-02-28",
                status: "Pending",
                createdAt: "2024-01-12"
            },
            {
                id: 3,
                title: "Employee Onboarding Process",
                description: "Update and streamline the new employee onboarding process",
                assignedEmployee: 3,
                assignedEmployeeName: "Mike Johnson",
                priority: "Low",
                deadline: "2024-03-10",
                status: "Completed",
                createdAt: "2024-01-08"
            }
        ];
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            console.log('Login form found, binding submit event');
            loginForm.addEventListener('submit', (e) => {
                console.log('Login form submitted');
                this.handleLogin(e);
            });
        } else {
            console.log('Login form not found');
        }

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Employee management
        const addEmployeeBtn = document.getElementById('addEmployeeBtn');
        if (addEmployeeBtn) {
            addEmployeeBtn.addEventListener('click', () => this.openEmployeeModal());
        }
        
        const employeeForm = document.getElementById('employeeForm');
        if (employeeForm) {
            employeeForm.addEventListener('submit', (e) => this.handleEmployeeSubmit(e));
        }
        
        const closeEmployeeModal = document.getElementById('closeEmployeeModal');
        if (closeEmployeeModal) {
            closeEmployeeModal.addEventListener('click', () => this.closeEmployeeModal());
        }
        
        const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');
        if (cancelEmployeeBtn) {
            cancelEmployeeBtn.addEventListener('click', () => this.closeEmployeeModal());
        }
        
        const employeeSearch = document.getElementById('employeeSearch');
        if (employeeSearch) {
            employeeSearch.addEventListener('input', (e) => this.handleEmployeeSearch(e));
        }

        // Task management
        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => this.openTaskModal());
        }
        
        const taskForm = document.getElementById('taskForm');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => this.handleTaskSubmit(e));
        }
        
        const closeTaskModal = document.getElementById('closeTaskModal');
        if (closeTaskModal) {
            closeTaskModal.addEventListener('click', () => this.closeTaskModal());
        }
        
        const cancelTaskBtn = document.getElementById('cancelTaskBtn');
        if (cancelTaskBtn) {
            cancelTaskBtn.addEventListener('click', () => this.closeTaskModal());
        }

        // Confirmation modal
        const cancelConfirm = document.getElementById('cancelConfirm');
        if (cancelConfirm) {
            cancelConfirm.addEventListener('click', () => this.closeConfirmModal());
        }
        
        const confirmAction = document.getElementById('confirmAction');
        if (confirmAction) {
            confirmAction.addEventListener('click', () => this.executeConfirmAction());
        }

        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });
    }

    checkAuth() {
        console.log('Checking auth status:', this.isAuthenticated);
        if (this.isAuthenticated) {
            this.showMainApp();
        } else {
            this.showLoginPage();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        console.log('Handling login...');
        
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (!emailInput || !passwordInput) {
            console.log('Email or password input not found');
            return;
        }
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        console.log('Attempting login with:', email);

        // Validate credentials
        if (email === 'admin@company.com' && password === 'admin123') {
            console.log('Login successful');
            this.isAuthenticated = true;
            this.currentUser = { email: email };
            
            // Clear form
            emailInput.value = '';
            passwordInput.value = '';
            
            // Show success message
            this.showToast('Login successful!', 'success');
            
            // Show main app immediately
            this.showMainApp();
        } else {
            console.log('Invalid credentials');
            this.showToast('Invalid credentials. Please try again.', 'error');
        }
    }

    handleLogout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.showLoginPage();
        this.showToast('Logged out successfully!', 'success');
    }

    showLoginPage() {
        console.log('Showing login page');
        const loginPage = document.getElementById('loginPage');
        const mainApp = document.getElementById('mainApp');
        
        if (loginPage) loginPage.classList.remove('hidden');
        if (mainApp) mainApp.classList.add('hidden');
    }

    showMainApp() {
        console.log('Showing main app');
        const loginPage = document.getElementById('loginPage');
        const mainApp = document.getElementById('mainApp');
        
        if (loginPage) {
            loginPage.classList.add('hidden');
        }
        if (mainApp) {
            mainApp.classList.remove('hidden');
        }
        
        // Set dashboard as active nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === 'dashboard') {
                link.classList.add('active');
            }
        });
        
        this.showSection('dashboard');
    }

    handleNavigation(e) {
        e.preventDefault();
        
        const section = e.target.dataset.section;
        if (section) {
            console.log('Navigating to:', section);
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            e.target.classList.add('active');

            this.showSection(section);
        }
    }

    showSection(sectionName) {
        console.log('Showing section:', sectionName);
        // Hide all sections
        document.querySelectorAll('.main-content').forEach(section => {
            section.classList.add('hidden');
        });

        // Show target section
        const targetSection = document.getElementById(`${sectionName}Section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // Load section-specific data
        if (sectionName === 'dashboard') {
            this.updateDashboard();
        } else if (sectionName === 'employees') {
            this.loadEmployees();
        } else if (sectionName === 'tasks') {
            this.loadTasks();
        }
    }

    updateDashboard() {
        const totalEmployees = this.employees.length;
        const activeEmployees = this.employees.filter(emp => emp.status === 'Active').length;
        const totalTasks = this.tasks.length;
        const pendingTasks = this.tasks.filter(task => task.status === 'Pending').length;

        const totalEmployeesEl = document.getElementById('totalEmployees');
        const activeEmployeesEl = document.getElementById('activeEmployees');
        const totalTasksEl = document.getElementById('totalTasks');
        const pendingTasksEl = document.getElementById('pendingTasks');

        if (totalEmployeesEl) totalEmployeesEl.textContent = totalEmployees;
        if (activeEmployeesEl) activeEmployeesEl.textContent = activeEmployees;
        if (totalTasksEl) totalTasksEl.textContent = totalTasks;
        if (pendingTasksEl) pendingTasksEl.textContent = pendingTasks;

        this.loadRecentActivities();
    }

    loadRecentActivities() {
        const activities = [
            { icon: '👤', text: 'New employee John Doe added', time: '2 hours ago' },
            { icon: '📝', text: 'Task "User Authentication" updated', time: '4 hours ago' },
            { icon: '✅', text: 'Task "Onboarding Process" completed', time: '1 day ago' },
            { icon: '🏢', text: 'New department "Operations" created', time: '2 days ago' }
        ];

        const container = document.getElementById('recentActivities');
        if (container) {
            container.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-content">
                        <p>${activity.text}</p>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    loadEmployees(filter = '') {
        const filteredEmployees = this.employees.filter(emp => {
            const searchTerm = filter.toLowerCase();
            return emp.name.toLowerCase().includes(searchTerm) ||
                   emp.email.toLowerCase().includes(searchTerm) ||
                   emp.department.toLowerCase().includes(searchTerm);
        });

        const tbody = document.getElementById('employeeTableBody');
        if (!tbody) return;

        if (filteredEmployees.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        <div class="empty-state">
                            <div class="empty-icon">👥</div>
                            <p>No employees found</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filteredEmployees.map(employee => `
            <tr>
                <td class="font-medium">${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.department}</td>
                <td>
                    <span class="status-badge ${employee.status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive'}">
                        ${employee.status}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn--secondary btn--sm" onclick="window.ems.editEmployee(${employee.id})">Edit</button>
                        <button class="btn btn--outline btn--sm" onclick="window.ems.deleteEmployee(${employee.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    handleEmployeeSearch(e) {
        this.loadEmployees(e.target.value);
    }

    openEmployeeModal(employee = null) {
        const modal = document.getElementById('employeeModal');
        const title = document.getElementById('employeeModalTitle');
        const form = document.getElementById('employeeForm');

        if (!modal || !title || !form) return;

        if (employee) {
            title.textContent = 'Edit Employee';
            document.getElementById('empName').value = employee.name || '';
            document.getElementById('empEmail').value = employee.email || '';
            document.getElementById('empPhone').value = employee.phone || '';
            document.getElementById('empDepartment').value = employee.department || '';
            document.getElementById('empStatus').value = employee.status || '';
            this.currentEditingEmployee = employee;
        } else {
            title.textContent = 'Add Employee';
            form.reset();
            this.currentEditingEmployee = null;
        }

        modal.classList.remove('hidden');
    }

    closeEmployeeModal() {
        const modal = document.getElementById('employeeModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentEditingEmployee = null;
    }

    handleEmployeeSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('empName').value.trim(),
            email: document.getElementById('empEmail').value.trim(),
            phone: document.getElementById('empPhone').value.trim(),
            department: document.getElementById('empDepartment').value,
            status: document.getElementById('empStatus').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.department || !formData.status) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        if (this.currentEditingEmployee) {
            // Update existing employee
            const index = this.employees.findIndex(emp => emp.id === this.currentEditingEmployee.id);
            if (index !== -1) {
                this.employees[index] = { ...this.employees[index], ...formData };
                this.showToast('Employee updated successfully!', 'success');
            }
        } else {
            // Add new employee
            const newEmployee = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString().split('T')[0]
            };
            this.employees.push(newEmployee);
            this.showToast('Employee added successfully!', 'success');
        }

        this.closeEmployeeModal();
        this.loadEmployees();
        this.updateTaskDropdown();
        this.updateDashboard();
    }

    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            this.openEmployeeModal(employee);
        }
    }

    deleteEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            this.showConfirmModal(
                'Delete Employee',
                `Are you sure you want to delete "${employee.name}"? This action cannot be undone.`,
                () => {
                    this.employees = this.employees.filter(emp => emp.id !== id);
                    // Also remove tasks assigned to this employee
                    this.tasks = this.tasks.filter(task => task.assignedEmployee !== id);
                    this.loadEmployees();
                    this.loadTasks();
                    this.updateDashboard();
                    this.showToast('Employee deleted successfully!', 'success');
                }
            );
        }
    }

    loadTasks() {
        const tbody = document.getElementById('taskTableBody');
        if (!tbody) return;

        if (this.tasks.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        <div class="empty-state">
                            <div class="empty-icon">📋</div>
                            <p>No tasks found</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.tasks.map(task => `
            <tr>
                <td class="font-medium">${task.title}</td>
                <td>${task.assignedEmployeeName}</td>
                <td>
                    <span class="status-badge priority-${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>
                </td>
                <td>
                    <span class="status-badge task-${task.status.toLowerCase().replace(/\s+/g, '')}">
                        ${task.status}
                    </span>
                </td>
                <td>${new Date(task.deadline).toLocaleDateString()}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn--secondary btn--sm" onclick="window.ems.editTask(${task.id})">Edit</button>
                        <button class="btn btn--outline btn--sm" onclick="window.ems.deleteTask(${task.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    openTaskModal(task = null) {
        const modal = document.getElementById('taskModal');
        const title = document.getElementById('taskModalTitle');
        const form = document.getElementById('taskForm');

        if (!modal || !title || !form) return;

        // Update employee dropdown
        this.updateTaskDropdown();

        if (task) {
            title.textContent = 'Edit Task';
            document.getElementById('taskTitle').value = task.title || '';
            document.getElementById('taskDescription').value = task.description || '';
            document.getElementById('taskEmployee').value = task.assignedEmployee || '';
            document.getElementById('taskPriority').value = task.priority || '';
            document.getElementById('taskDeadline').value = task.deadline || '';
            document.getElementById('taskStatus').value = task.status || '';
            this.currentEditingTask = task;
        } else {
            title.textContent = 'Add Task';
            form.reset();
            // Set default deadline to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('taskDeadline').value = tomorrow.toISOString().split('T')[0];
            this.currentEditingTask = null;
        }

        modal.classList.remove('hidden');
    }

    updateTaskDropdown() {
        const select = document.getElementById('taskEmployee');
        if (!select) return;

        const activeEmployees = this.employees.filter(emp => emp.status === 'Active');
        
        select.innerHTML = '<option value="">Select Employee</option>' +
            activeEmployees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('');
    }

    closeTaskModal() {
        const modal = document.getElementById('taskModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentEditingTask = null;
    }

    handleTaskSubmit(e) {
        e.preventDefault();
        
        const employeeId = parseInt(document.getElementById('taskEmployee').value);
        const employee = this.employees.find(emp => emp.id === employeeId);
        
        const formData = {
            title: document.getElementById('taskTitle').value.trim(),
            description: document.getElementById('taskDescription').value.trim(),
            assignedEmployee: employeeId,
            assignedEmployeeName: employee ? employee.name : '',
            priority: document.getElementById('taskPriority').value,
            deadline: document.getElementById('taskDeadline').value,
            status: document.getElementById('taskStatus').value
        };

        // Basic validation
        if (!formData.title || !formData.description || !formData.assignedEmployee || 
            !formData.priority || !formData.deadline || !formData.status) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        if (this.currentEditingTask) {
            // Update existing task
            const index = this.tasks.findIndex(task => task.id === this.currentEditingTask.id);
            if (index !== -1) {
                this.tasks[index] = { ...this.tasks[index], ...formData };
                this.showToast('Task updated successfully!', 'success');
            }
        } else {
            // Add new task
            const newTask = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString().split('T')[0]
            };
            this.tasks.push(newTask);
            this.showToast('Task added successfully!', 'success');
        }

        this.closeTaskModal();
        this.loadTasks();
        this.updateDashboard();
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.openTaskModal(task);
        }
    }

    deleteTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.showConfirmModal(
                'Delete Task',
                `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
                () => {
                    this.tasks = this.tasks.filter(t => t.id !== id);
                    this.loadTasks();
                    this.updateDashboard();
                    this.showToast('Task deleted successfully!', 'success');
                }
            );
        }
    }

    showConfirmModal(title, message, onConfirm) {
        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');

        if (modal && titleEl && messageEl) {
            titleEl.textContent = title;
            messageEl.textContent = message;
            modal.classList.remove('hidden');
            this.currentConfirmAction = onConfirm;
        }
    }

    closeConfirmModal() {
        const modal = document.getElementById('confirmModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentConfirmAction = null;
    }

    executeConfirmAction() {
        if (this.currentConfirmAction) {
            this.currentConfirmAction();
        }
        this.closeConfirmModal();
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
        this.currentEditingEmployee = null;
        this.currentEditingTask = null;
        this.currentConfirmAction = null;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) return;
        
        // Remove existing classes
        toast.className = 'toast';
        
        // Add type class
        if (type === 'error') {
            toast.classList.add('error');
        } else if (type === 'warning') {
            toast.classList.add('warning');
        }
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize the application
window.ems = new EmployeeManagementSystem();