import { mockData } from '../utils/generate-mock-data.js';

class EmployeeService {
    constructor() {
        // LocalStorage'dan mevcut verileri al
        const storedData = localStorage.getItem('employees');
        const storedEmployees = storedData ? JSON.parse(storedData) : [];
        
        // Mock data'daki ID'leri kontrol et ve güncelle
        const lastStoredId = storedEmployees.length > 0 
            ? Math.max(...storedEmployees.map(e => parseInt(e.id)))
            : 0;
            
        const newMockData = mockData.map((emp, index) => ({
            ...emp,
            id: (lastStoredId + index + 1).toString()
        }));

        // Mevcut veriler ile mock data'yı birleştir
        this._employees = [...storedEmployees, ...newMockData];
        
        // Birleştirilmiş veriyi localStorage'a kaydet
        this._saveToLocalStorage();
    }

    async getAll() {
        try {
            return [...this._employees];
        } catch (error) {
            console.error('Veri alınırken hata:', error);
            return [];
        }
    }

    async getById(id) {
        return this._employees.find(employee => employee.id === id);
    }

    async create(employee) {
        const lastId = Math.max(...this._employees.map(e => parseInt(e.id)));
        employee.id = (lastId + 1).toString();
        this._employees.push(employee);
        this._saveToLocalStorage();
        return employee;
    }

    async update(employee) {
        const index = this._employees.findIndex(e => e.id === employee.id);
        if (index !== -1) {
            this._employees[index] = employee;
            this._saveToLocalStorage();
            return employee;
        }
        throw new Error('Çalışan bulunamadı');
    }

    async delete(id) {
        const index = this._employees.findIndex(e => e.id === id);
        if (index !== -1) {
            this._employees.splice(index, 1);
            this._saveToLocalStorage();
            return true;
        }
        return false;
    }

    _saveToLocalStorage() {
        try {
            localStorage.setItem('employees', JSON.stringify(this._employees));
        } catch (error) {
            console.error('LocalStorage\'a kayıt yapılırken hata:', error);
        }
    }
}

export const employeeService = new EmployeeService();