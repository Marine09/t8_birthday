interface RawBirthdayData {
  name: string;
  dob: string;
}

export interface FormattedBirthday {
  id: string;
  name: string;
  birthdate: Date;
  age: number;
  avatarUrl?: string;
}

const rawBirthdayData: RawBirthdayData[] = [
  { name: "Sachin Bhande", dob: "08-May" },
  { name: "Rajendra Mangekar", dob: "11-Sep" },
  { name: "Sudhir Rokade", dob: "23-Sep" },
  { name: "Shailendra Pednekar", dob: "12-Aug" },
  { name: "Prathamesh Subhash Pednekar", dob: "03-Oct" },
  { name: "Shrusti Narendra Mestri", dob: "08-Feb" },
  { name: "Mahamadsameer Allauddin Shaikh", dob: "" },
  { name: "Suraj Vishwakarma", dob: "13-Sep" },
  { name: "Akshay Pawar", dob: "08-Jun" },
  { name: "Kishori Shinde", dob: "21-Sep" },
  { name: "Pramod Patil", dob: "24-Aug" },
  { name: "Vandana Salaskar", dob: "" },
  { name: "Amol Sopan Nalawade", dob: "27-Jan" },
  { name: "Jitendra Laxman Bhaskar", dob: "11-Jul" },
  { name: "Nikhil Randive", dob: "05-May" },
  { name: "Ramkrishna Landge", dob: "21-Nov" },
  { name: "Vaibhavee Kadam", dob: "21-Dec" },
  { name: "Ashok Sudam Salunke", dob: "01-Aug" },
  { name: "Prit Kumar Gupta", dob: "01-Mar" },
  { name: "Ramanuj Yadav", dob: "10-Dec" },
  { name: "Shraddha Malvankar", dob: "08-Mar" },
  { name: "Sachin Vaidya", dob: "27-Dec" },
  { name: "Vrushali Shirke", dob: "09-Sep" },
  { name: "Mansi Deshpande", dob: "17-Nov" },
  { name: "Ravikumar Prajapati", dob: "18-Mar" },
  { name: "Pasandjeet Pandit", dob: "05-Sep" },
  { name: "Sandesh Phunguskar", dob: "13-Aug" },
  { name: "Santosh Bhawar", dob: "" },
  { name: "Swapnil Jadhav", dob: "" },
  { name: "Sagar Sawant", dob: "26-Oct" },
  { name: "Brijendra Pal", dob: "10-Jul" },
  { name: "Ravindra Warade", dob: "02-Apr" },
  { name: "Paresh Bhosale", dob: "30-Mar" },
  { name: "Niraj Chauhan", dob: "18-Oct" },
  { name: "Gauri Tirlotkar", dob: "01-Nov" },
  { name: "Satish C Gholap", dob: "26-Aug" },
  { name: "Sanket Pathare", dob: "26-Dec" },
  { name: "Abulkalamazad Sekh", dob: "13-Mar" },
  { name: "Roshan Shinde", dob: "30-May" },
  { name: "Faaiz Akhatar", dob: "08-Jul" },
  { name: "Manish Srivastav", dob: "21-May" },
  { name: "Deepak Tripathi", dob: "16-Aug" },
  { name: "Tejasvi Pawar", dob: "25-Jul" },
  { name: "Vyankatesh Ghadigaovkar", dob: "27-Jul" },
  { name: "Shubham Bodke", dob: "01-Oct" },
  { name: "Ashutosh Tiwari", dob: "23-Jul" },
  { name: "Manish Dalvi", dob: "09-Apr" },
  { name: "Vivek Vishwakarma", dob: "07-Jun" },
  { name: "Samruddhi Kelaskar", dob: "13-Nov" },
  { name: "Anil Dwivedi", dob: "20-May" },
  { name: "Mayur Patil", dob: "25-Sep" },
  { name: "Agasthi", dob: "" },
  { name: "Ruchita More", dob: "25-Oct" },
  { name: "Saumya Sahoo", dob: "" },
  { name: "Abhishek Jha", dob: "25-May" },
  { name: "Omkar Ranjane", dob: "02-Sep" }
];

const monthMap: { [key: string]: number } = {
  'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
  'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
};

export function formatBirthdays(): FormattedBirthday[] {
  const currentYear = new Date().getFullYear();
  
  return rawBirthdayData
    .filter(person => person.dob) // Filter out empty birthdates
    .map(person => {
      const [day, month] = person.dob.split('-');
      const monthIndex = monthMap[month];
      const birthdate = new Date(currentYear, monthIndex, parseInt(day));
      
      // Generate a consistent avatar URL based on the person's name
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(person.name)}`;

      return {
        id: person.name.replace(/\s+/g, '-').toLowerCase(),
        name: person.name,
        birthdate,
        age: 0, // Since we don't have birth years
        avatarUrl
      };
    })
    .sort((a, b) => {
      // Sort by month and day
      const dateA = a.birthdate;
      const dateB = b.birthdate;
      return dateA.getTime() - dateB.getTime();
    });
}

export function getUpcomingBirthdays(count: number = 5): FormattedBirthday[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const allBirthdays = formatBirthdays();
  
  // Adjust dates to current or next year based on whether they've passed
  const adjustedBirthdays = allBirthdays.map(birthday => {
    const birthdateThisYear = new Date(birthday.birthdate);
    birthdateThisYear.setFullYear(currentYear);
    
    if (birthdateThisYear < today) {
      birthdateThisYear.setFullYear(currentYear + 1);
    }
    
    return {
      ...birthday,
      birthdate: birthdateThisYear
    };
  });
  
  // Sort by upcoming dates
  return adjustedBirthdays
    .sort((a, b) => a.birthdate.getTime() - b.birthdate.getTime())
    .slice(0, count);
} 