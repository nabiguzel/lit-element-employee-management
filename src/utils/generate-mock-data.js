function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

function generateRandomPhone() {
    return `+90${Math.floor(500000000 + Math.random() * 499999999)}`;
}

function turkishToEnglish(text) {
    const charMap = {
        'ç': 'c',
        'Ç': 'C',
        'ğ': 'g',
        'Ğ': 'G',
        'ı': 'i',
        'İ': 'I',
        'ö': 'o',
        'Ö': 'O',
        'ş': 's',
        'Ş': 'S',
        'ü': 'u',
        'Ü': 'U'
    };
    
    return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, match => charMap[match]);
}

function generateRandomEmail(firstName, lastName) {
    const domains = ['sourtimes.org', 'company.com', 'workspace.net'];
    // İsimlerdeki Türkçe karakterleri İngilizce karakterlere çevir
    const normalizedFirstName = turkishToEnglish(firstName.toLowerCase());
    const normalizedLastName = turkishToEnglish(lastName.toLowerCase());
    return `${normalizedFirstName}.${normalizedLastName}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

const firstNames = ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Zeynep', 'Can', 'Ece', 'Deniz', 'Berk', 'Elif', 'Burak'];
const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Öztürk', 'Aydın', 'Özdemir', 'Arslan', 'Doğan'];
const departments = ['Analytics', 'Tech'];
const positions = ['Junior', 'Medior', 'Senior'];

export function generateMockEmployees(count = 50) {
    return Array.from({ length: count }, (_, index) => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return {
            id: (index + 1).toString(),
            firstName,
            lastName,
            dateOfEmployment: generateRandomDate(new Date(2020, 0, 1), new Date()),
            dateOfBirth: generateRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)),
            phoneNumber: generateRandomPhone(),
            email: generateRandomEmail(firstName, lastName),
            department: departments[Math.floor(Math.random() * departments.length)],
            position: positions[Math.floor(Math.random() * positions.length)]
        };
    });
} 