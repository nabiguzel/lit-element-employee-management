import { generateMockEmployees } from '../utils/generate-mock-data.js';

class EmployeeStore {
    constructor() {
        this.storageKey = 'employees';
        this.initializeData();
    }

    initializeData() {
        // LocalStorage'dan veriyi kontrol et
        const storedData = localStorage.getItem(this.storageKey);
        
        // Eğer veri yoksa mock data oluştur ve kaydet
        if (!storedData) {
            const mockData = generateMockEmployees(50);
            localStorage.setItem(this.storageKey, JSON.stringify(mockData));
        }
    }

    async getEmployees() {
        const data = localStorage.getItem(this.storageKey);
        return JSON.parse(data || '[]');
    }

    async getEmployee(id) {
        const employees = await this.getEmployees();
        return employees.find(emp => emp.id === id);
    }

    async addEmployee(employee) {
        const employees = await this.getEmployees();
        const newId = Math.max(...employees.map(emp => parseInt(emp.id)), 0) + 1;
        const newEmployee = { ...employee, id: newId.toString() };
        employees.unshift(newEmployee);
        localStorage.setItem(this.storageKey, JSON.stringify(employees));
        return newEmployee;
    }

    async updateEmployee(employee) {
        const employees = await this.getEmployees();
        const index = employees.findIndex(emp => emp.id === employee.id);
        if (index !== -1) {
            employees[index] = employee;
            localStorage.setItem(this.storageKey, JSON.stringify(employees));
        }
        return employee;
    }

    async deleteEmployee(id) {
        const employees = await this.getEmployees();
        const filteredEmployees = employees.filter(emp => emp.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredEmployees));
    }
}

export const employeeStore = new EmployeeStore(); 