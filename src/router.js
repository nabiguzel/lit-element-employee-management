import { Router } from '@vaadin/router';
import './pages/employee/employee-list.js';

// Router'ı oluştur
export const router = new Router();

// Route'ları tanımla
router.setRoutes([
  {
    path: '/',
    component: 'employee-list',
    action: async () => {
      document.title = 'ING - Çalışan Listesi';
      return undefined;
    }
  },
  {
    path: '/add',
    component: 'employee-add-edit',
    action: async () => {
      document.title = 'ING - Çalışan Ekle';
      await import('./pages/employee/employee-add-edit.js');
    }
  },
  {
    path: '/edit/:id',
    component: 'employee-add-edit',
    action: async () => {
      document.title = 'ING - Çalışan Düzenle';
      await import('./pages/employee/employee-add-edit.js');
    }
  },
  {
    path: '/icon-show',
    component: 'employee-form',
    action: async () => {
      document.title = 'ING - Çalışan Ekle';
      await import('./components/employee-form.js');
    }
  }
]); 