import { languageManager } from './language-manager.js';

const translations = {
  tr: {
    'add-new':'Yeni Ekle',
    'table-view': 'Tablo Görünümü',
    'list-view': 'Liste Görünümü',
    'search-placeholder': 'Çalışan ara...',
    'first-name': 'Ad',
    'last-name': 'Soyad',
    'department': 'Departman',
    'position': 'Pozisyon',
    'actions': 'İşlemler',
    'edit': 'Düzenle',
    'delete': 'Sil',
    'previous': 'Önceki',
    'next': 'Sonraki',
    'confirm-delete': 'Bu çalışanı silmek istediğinizden emin misiniz?',
    'confirm-update': 'Değişiklikleri kaydetmek istediğinizden emin misiniz?',
    'invalid-email': 'Geçerli bir e-posta adresi giriniz',
    'invalid-phone': 'Geçerli bir telefon numarası giriniz',
    'select-department': 'Departman seçiniz',
    'select-position': 'Pozisyon seçiniz',
    'update': 'Güncelle',
    'create': 'Oluştur',
    'date-of-birth': 'Doğum Tarihi',
    'date-of-employment': 'İşe Başlama Tarihi',
    'phone-number': 'Telefon',
    'email': 'Email Adresi',
    'loading': 'Yükleniyor...',
    'error-loading': 'Veriler yüklenirken bir hata oluştu',
    'no-results': 'Sonuç bulunamadı',
    'employees': 'Çalışanlar',
    'edit-employee': 'Çalışan Düzenle',
    'add-employee': 'Çalışan Ekle',
    'delete-selected': 'Seçilileri Sil',
    'confirm-delete-one': 'Bu kaydı silmek istediğinizden emin misiniz?',
    'confirm-delete-many': 'Seçili {count} kaydı silmek istediğinizden emin misiniz?',
    'error-deleting': 'Kayıtlar silinirken bir hata oluştu.',
    'employee-list': 'Çalışan Listesi',
    'proceed': 'Devam Et',
    'cancel': 'İptal',
    'are-you-sure': 'Emin misiniz?',
    'selected-employee-delete': '{name} isimli çalışan kaydı silinecek',
    'selected-employees-delete': 'Seçili {count} çalışan kaydı silinecek',
    'items-per-page': 'Sayfa başına',
    'record-added': 'Yeni kayıt başarıyla eklenmiştir',
    'record-updated': 'Güncelleme başarıyla gerçekleşmiştir',
    'record-deleted': 'Silme işlemi başarıyla gerçekleşmiştir',
    'records-deleted': 'Seçili kayıtlar başarıyla silinmiştir',
    'clear-search': 'Aramayı Temizle',
    'search': 'Ara...'
  },
  en: {
    'add-new':'Add New',
    'table-view': 'Table View',
    'list-view': 'List View',
    'search-placeholder': 'Search employees...',
    'first-name': 'First Name',
    'last-name': 'Last Name',
    'department': 'Department',
    'position': 'Position',
    'actions': 'Actions',
    'edit': 'Edit',
    'delete': 'Delete',
    'previous': 'Previous',
    'next': 'Next',
    'confirm-delete': 'Are you sure you want to delete this employee?',
    'confirm-update': 'Are you sure you want to save the changes?',
    'invalid-email': 'Please enter a valid email address',
    'invalid-phone': 'Please enter a valid phone number',
    'select-department': 'Select Department',
    'select-position': 'Select Position',
    'update': 'Update',
    'create': 'Create',
    'date-of-birth': 'Date of Birth',
    'date-of-employment': 'Date of Employment',
    'phone-number': 'Phone Number',
    'email': 'Email Address',
    'loading': 'Loading...',
    'error-loading': 'Error loading data',
    'no-results': 'No results found',
    'employees': 'Employees',
    'edit-employee': 'Edit Employee',
    'add-employee': 'Add Employee',
    'delete-selected': 'Delete Selected',
    'confirm-delete-one': 'Are you sure you want to delete this record?',
    'confirm-delete-many': 'Are you sure you want to delete {count} selected records?',
    'error-deleting': 'Error occurred while deleting records.',
    'employee-list': 'Employee List',
    'proceed': 'Proceed',
    'cancel': 'Cancel',
    'are-you-sure': 'Are you sure?',
    'selected-employee-delete': 'Employee record of {name} will be deleted',
    'selected-employees-delete': '{count} selected employee records will be deleted',
    'items-per-page': 'Items per page',
    'record-added': 'New record has been successfully added',
    'record-updated': 'Record has been successfully updated',
    'record-deleted': 'Record has been successfully deleted',
    'records-deleted': 'Selected records have been successfully deleted',
    'clear-search': 'Clear Search',
    'search': 'Search...'
  }
};

export function localize(key) {
  const lang = languageManager.currentLanguage || 'tr';
  return translations[lang]?.[key] || key;
} 