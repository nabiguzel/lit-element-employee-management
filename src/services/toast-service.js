class ToastService {
    constructor() {
        this.listeners = new Set();
    }

    show(message, type = 'info') {
        this.listeners.forEach(listener => listener({ message, type }));
    }

    addListener(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}

export const toastService = new ToastService(); 