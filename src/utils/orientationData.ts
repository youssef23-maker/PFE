// export const OrientationData = {
//   general: {
//     welcome: {
//       keywords: ['welcome', 'introduction', 'overview', 'start', 'orientation', 'new', 'beginning'],
//       response: `Welcome to our orientation program! We're delighted to have you join us. This orientation will help you get acquainted with our organization, policies, and resources available to you. Feel free to ask me any specific questions about different aspects of the orientation process.`
//     },
//     schedule: {
//       keywords: ['schedule', 'timetable', 'agenda', 'plan', 'program', 'timing'],
//       response: `The orientation schedule typically includes:
// 1. Welcome and Introduction (Day 1, 9:00 AM)
// 2. Organization Overview (Day 1, 10:30 AM)
// 3. Team Meet-and-Greet (Day 1, 2:00 PM)
// 4. Policies and Procedures (Day 2, 9:00 AM)
// 5. Systems Training (Day 2, 11:00 AM)
// 6. Resources Overview (Day 2, 2:00 PM)
// 7. Q&A Session (Day 2, 4:00 PM)

// Please check your email for the detailed schedule with meeting locations or links.`
//     },
//     contacts: {
//       keywords: ['contact', 'who to call', 'help', 'support', 'phone', 'email', 'reach out'],
//       response: `Important contacts:
// - Orientation Coordinator: orientationteam@example.com
// - IT Support: techsupport@example.com or ext. 1234
// - HR Department: hr@example.com or ext. 5678
// - Facilities: facilities@example.com or ext. 9012

// If you have any specific questions, feel free to ask and I can provide more tailored contact information.`
//     }
//   },
  
//   policies: {
//     attendance: {
//       keywords: ['attendance', 'absent', 'sick', 'leave', 'time off', 'vacation', 'pto'],
//       response: `Attendance Policy:
// - Regular work hours are typically 9:00 AM to 5:00 PM Monday through Friday
// - To report an absence, notify your supervisor at least 1 hour before your shift
// - Sick leave accrues at 1 day per month (12 days annually)
// - Vacation time depends on your tenure, starting at 10 days per year
// - Time-off requests should be submitted at least 2 weeks in advance through the HR portal

// For more specific information, please refer to the Employee Handbook or contact HR.`
//     },
//     dress: {
//       keywords: ['dress code', 'attire', 'clothing', 'what to wear', 'uniform'],
//       response: `Dress Code:
// Our organization follows a business casual dress code. This generally means:
// - Professional slacks, skirts, or dresses
// - Collared shirts, blouses, or sweaters
// - Closed-toe shoes in good condition
// - No jeans, t-shirts, or athletic wear except on designated casual days

// Specific departments may have additional requirements based on their function. Your orientation packet includes a complete guide to appropriate workplace attire.`
//     },
//     confidentiality: {
//       keywords: ['confidential', 'privacy', 'secret', 'nda', 'information', 'data'],
//       response: `Confidentiality Policy:
// All employees must protect confidential information related to our organization, clients, and colleagues. Key points:
// - You'll be required to sign a Non-Disclosure Agreement (NDA)
// - Never share sensitive information on social media or with unauthorized individuals
// - Client information should only be accessed on a need-to-know basis
// - Report any potential data breaches immediately to your supervisor and IT security
// - Secure all physical and digital documents properly

// Violations of the confidentiality policy may result in disciplinary action.`
//     }
//   },
  
//   resources: {
//     training: {
//       keywords: ['training', 'learn', 'course', 'education', 'development', 'skill'],
//       response: `Training Resources:
// We offer various training opportunities to support your professional development:
// 1. Onboarding Training: Required for all new employees (scheduled during orientation)
// 2. Technical Training: Role-specific skills training scheduled by your department
// 3. Learning Portal: Access to online courses and resources (login details will be emailed)
// 4. Lunch & Learn: Monthly sessions on various topics (calendar in staff portal)
// 5. Mentorship Program: Optional program to connect with experienced colleagues

// To request specific training, speak with your manager or contact the Learning & Development team at training@example.com.`
//     },
//     benefits: {
//       keywords: ['benefits', 'insurance', 'health', 'retirement', '401k', 'perks', 'compensation'],
//       response: `Employee Benefits:
// Our comprehensive benefits package includes:
// - Health, Dental, and Vision Insurance (effective first of the month after 30 days)
// - 401(k) Retirement Plan with company matching up to 4%
// - Life and Disability Insurance
// - Wellness Program and Gym Reimbursement
// - Employee Assistance Program (EAP)
// - Tuition Reimbursement
// - Paid Time Off and Holidays

// You'll need to complete enrollment forms within 30 days of your start date. The HR team will schedule a benefits orientation to explain options in detail.`
//     },
//     technology: {
//       keywords: ['computer', 'laptop', 'software', 'hardware', 'it', 'tech', 'system', 'login', 'password'],
//       response: `Technology Resources:
// As a new team member, you'll be provided with necessary technology tools:
// - Computer/laptop (configured by IT department)
// - Organization email account
// - Access to relevant software applications
// - System logins (credentials provided on your first day)
// - IT support available at helpdesk@example.com or ext. 1234

// Please note that all technology use must comply with our Acceptable Use Policy, which you'll review during orientation. For any technical issues, submit a ticket through the IT portal or contact the helpdesk.`
//     }
//   },
  
//   facilities: {
//     location: {
//       keywords: ['location', 'office', 'address', 'building', 'directions', 'parking', 'map'],
//       response: `Office Locations and Facilities:
// Our main office is located at 123 Business Avenue, Suite 500, Metropolis.

// Key information:
// - Building hours: 7:00 AM - 7:00 PM, Monday through Friday
// - Parking available in the attached garage (bring your pass for validation)
// - Public transportation: Bus routes 10 and 15 stop directly in front
// - Office layout maps are available at reception and on the intranet
// - Your department is located on the 5th floor, East Wing

// Please arrive 15 minutes early on your first day to complete security check-in procedures.`
//     },
//     amenities: {
//       keywords: ['amenities', 'cafeteria', 'gym', 'break room', 'coffee', 'lunch', 'kitchen'],
//       response: `Office Amenities:
// Our facilities include various amenities to enhance your work experience:
// - Cafeteria (3rd floor): Open 7:30 AM - 3:00 PM, accepts credit cards and mobile pay
// - Break rooms on each floor with microwaves, refrigerators, and coffee machines
// - Fitness center (Basement level): Open 6:00 AM - 8:00 PM (requires badge access)
// - Quiet rooms for focused work (reservable through the office portal)
// - Collaboration spaces and meeting rooms (reservable through Outlook)
// - Mail and package services at main reception

// Additional amenities may be available based on your office location.`
//     },
//     security: {
//       keywords: ['security', 'badge', 'id card', 'access', 'emergency', 'evacuation', 'safety'],
//       response: `Security and Safety:
// Your safety is important to us. Please note the following security procedures:
// - ID badges must be worn visibly at all times
// - Visitors must sign in at reception and be escorted
// - Don't hold doors open for others or share your access credentials
// - Familiarize yourself with emergency exits and evacuation procedures
// - Emergency assembly point is in the south parking lot
// - First aid kits are located near each elevator bank
// - Security desk can be reached at ext. 9999

// A complete safety orientation will be provided during your first week.`
//     }
//   }
// };
export const OrientationData = {
  general: {
    welcome: {
      keywords: ['welcome', 'introduction', 'overview', 'start', 'orientation', 'new', 'beginning', 'fst', 'mohammedia'],
      response: `Welcome to FST Mohammedia! The Faculty of Sciences and Techniques (Faculté des Sciences et Techniques) is a leading institution under Hassan II University of Casablanca. We offer diverse programs in science, engineering, and technology fields. How can I help you learn more about our facilities, programs, or admission procedures?`
    },
    about: {
      keywords: ['about', 'history', 'information', 'fst', 'faculty', 'overview'],
      response: `FST Mohammedia is a prestigious institution founded to provide high-quality education in scientific and technical fields. As part of Hassan II University of Casablanca, we are committed to excellence in teaching and research. Our faculty includes distinguished professors and researchers dedicated to advancing knowledge and preparing students for successful careers in science and technology.`
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'address', 'location', 'reach'],
      response: `Contact Information for FST Mohammedia:
- Address: Boulevard Hassan II, B.P. 146, Mohammedia 20650, Morocco
- Phone: +212 5233-15352 / +212 5233-15353
- Fax: +212 5233-15353
- Email: contact@fstm.ac.ma
- Website: www.fstm.ac.ma

For specific department contacts, please specify which department you need to reach.`
    }
  },
  
  academics: {
    programs: {
      keywords: ['programs', 'degrees', 'majors', 'study', 'fields', 'specializations'],
      response: `FST Mohammedia offers various academic programs across multiple levels:

Bachelor's Programs (Licence):
- Computer Science
- Mathematics
- Physics
- Chemistry
- Biology
- Earth and Universe Sciences

Master's Programs:
- Renewable Energy and Energy Efficiency
- Environmental Engineering
- Mathematical Modeling and Applications
- Chemistry of Materials
- Biotechnology and Sustainable Development

Doctoral Programs:
- Various specialized research tracks in all scientific disciplines

Each program combines theoretical knowledge with practical applications to prepare students for professional careers or academic research.`
    },
    admission: {
      keywords: ['admission', 'apply', 'requirements', 'application', 'enroll', 'registration'],
      response: `Admission Requirements:

For Bachelor's Programs:
- Moroccan Baccalaureate or equivalent qualification
- Strong academic record in scientific subjects
- Completion of the national pre-selection and entrance exams
- Application through the national university admission portal

For Master's Programs:
- Bachelor's degree in relevant scientific field
- Minimum GPA requirements (typically 12/20 or higher)
- Successful completion of entrance exam and/or interview
- Application documents include academic transcripts, CV, and motivation letter

For Doctoral Programs:
- Master's degree in relevant field
- Research proposal
- Recommendation letters
- Interview with doctoral committee

Application deadlines vary by program and are announced on the official website each academic year.`
    },
    calendar: {
      keywords: ['calendar', 'schedule', 'academic year', 'dates', 'semester', 'exams', 'holidays'],
      response: `Academic Calendar:

The academic year at FST Mohammedia typically follows this structure:
- Fall Semester: September to January
  * Classes begin: Early September
  * Winter break: Last two weeks of December
  * Final exams: January

- Spring Semester: February to June
  * Classes begin: Early February
  * Spring break: One week in April
  * Final exams: June

- Summer Session (for certain programs): July-August

Important religious holidays are observed according to the national calendar. For the specific dates of the current academic year, please check the university website or contact the registrar's office.`
    }
  },
  
  resources: {
    facilities: {
      keywords: ['facilities', 'infrastructure', 'campus', 'buildings', 'labs', 'library'],
      response: `Campus Facilities:

FST Mohammedia boasts modern facilities to support academic excellence:
- State-of-the-art laboratories for physics, chemistry, biology, and computer science
- Multimedia-equipped lecture halls and classrooms
- Central library with extensive scientific collections and digital resources
- Computer centers with specialized software for technical disciplines
- Student common areas and cafeteria
- Sports facilities including courts and fields
- Research centers focusing on renewable energy, materials science, and environmental studies

All buildings are equipped with Wi-Fi access for students and staff. Laboratory access requires student ID and adherence to safety protocols.`
    },
    studentLife: {
      keywords: ['student life', 'activities', 'clubs', 'organizations', 'events', 'housing'],
      response: `Student Life at FST Mohammedia:

The university offers a vibrant student experience through:
- Student associations for various scientific disciplines
- Cultural clubs and activities
- Sports teams and competitions
- Scientific conferences and seminars
- Innovation competitions and hackathons
- International exchange programs

Housing options include:
- University residences (CROUS) available by application
- Private accommodations near campus
- Transportation services connecting major residential areas to campus

Student services also include career counseling, health services, and academic advising to support your educational journey.`
    },
    research: {
      keywords: ['research', 'projects', 'publications', 'innovation', 'laboratory', 'scientific'],
      response: `Research at FST Mohammedia:

Our institution prides itself on cutting-edge research activities:
- Multiple research laboratories specialized in various scientific fields
- Collaborative projects with industry partners and international universities
- Regular publication in prestigious scientific journals
- Organization of international conferences and symposia
- Innovation incubator for student and faculty projects
- Research grants and funding opportunities

Key research areas include:
- Renewable energy and energy efficiency
- Computer science and artificial intelligence
- Environmental monitoring and protection
- Advanced materials development
- Biotechnology applications

Students can participate in research activities through project courses, internships, and thesis work.`
    }
  }
};