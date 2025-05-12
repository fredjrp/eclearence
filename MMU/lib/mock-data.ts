// Mock student data
export const mockStudentData = {
  regNumber: "BUS-242-028/2022",
  name: "John Doe",
  email: "john.doe@mmu.ac.ke",
  phone: "+254712345678",
  program: "BBIT",
  faculty: "BBIT",
  year: 4,
  type: "student",
  profileImage: "/placeholder.svg?height=150&width=150",
  clearance: {
    finance: {
      status: "pending",
      comment: "",
    },
    library: {
      status: "pending",
      comment: "",
    },
    academic: {
      status: "pending",
      comment: "",
    },
    admin: {
      status: "pending",
      comment: "",
    },
    hostel: {
      status: "rejected",
      comment: "Please fix the damages before clearance can be approved.",
      rejectionReasons: [
        {
          id: "room-damage",
          title: "Room Damage",
          description: "Damage to hostel property found",
        },
        {
          id: "inspection-failed",
          title: "Inspection Failed",
          description: "Room inspection not passed",
        },
      ],
    },
    sports: {
      status: "completed",
      comment: "",
    },
    health: {
      status: "completed",
      comment: "",
    },
    examinations: {
      status: "pending",
      comment: "",
    },
  },
  departmentInfo: {
    library: {
      unreturnedBooks: [
        {
          title: "Introduction to Algorithms",
          author: "Thomas H. Cormen",
          dueDate: "2023-05-15",
          image: "/placeholder.svg?height=160&width=120",
        },
      ],
    },
    academic: {
      attendance: [
        { code: "BIT 4101", name: "Advanced Database Systems", attendance: 80 },
        { code: "BIT 4102", name: "Software Engineering", attendance: 65 },
        { code: "BIT 4103", name: "Computer Networks", attendance: 90 },
      ],
      grades: [
        { code: "BIT 4101", name: "Advanced Database Systems", grade: "B+" },
        { code: "BIT 4102", name: "Software Engineering", grade: "C" },
        { code: "BIT 4103", name: "Computer Networks", grade: "A-" },
      ],
    },
    finance: {
      balance: 12500,
    },
    hostel: {
      damages: [
        {
          item: "Desk",
          description: "Minor scratches",
          cost: 1500,
          image: "/placeholder.svg?height=120&width=120",
        },
        {
          item: "Chair",
          description: "Broken leg",
          cost: 2500,
          image: "/placeholder.svg?height=120&width=120",
        },
      ],
    },
  },
}

// Mock students data for department view
export const mockStudentsData = [
  {
    regNumber: "BUS-242-028/2022",
    name: "John Doe",
    email: "john.doe@mmu.ac.ke",
    phone: "+254712345678",
    program: "BBIT",
    faculty: "BBIT",
    year: 4,
    profileImage: "/placeholder.svg?height=150&width=150",
    clearance: {
      finance: {
        status: "pending",
        comment: "",
      },
      library: {
        status: "pending",
        comment: "",
      },
      academic: {
        status: "pending",
        comment: "",
      },
      admin: {
        status: "pending",
        comment: "",
      },
      hostel: {
        status: "rejected",
        comment: "Please fix the damages before clearance can be approved.",
        rejectionReasons: [
          {
            id: "room-damage",
            title: "Room Damage",
            description: "Damage to hostel property found",
          },
          {
            id: "inspection-failed",
            title: "Inspection Failed",
            description: "Room inspection not passed",
          },
        ],
      },
      sports: {
        status: "completed",
        comment: "",
      },
      health: {
        status: "completed",
        comment: "",
      },
      examinations: {
        status: "pending",
        comment: "",
      },
    },
    departmentInfo: {
      library: {
        unreturnedBooks: [
          {
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            dueDate: "2023-05-15",
            image: "/placeholder.svg?height=160&width=120",
          },
        ],
      },
      academic: {
        attendance: [
          { code: "BIT 4101", name: "Advanced Database Systems", attendance: 80 },
          { code: "BIT 4102", name: "Software Engineering", attendance: 65 },
          { code: "BIT 4103", name: "Computer Networks", attendance: 90 },
        ],
      },
      finance: {
        balance: 12500,
      },
      hostel: {
        damages: [
          {
            item: "Desk",
            description: "Minor scratches",
            cost: 1500,
            image: "/placeholder.svg?height=120&width=120",
          },
          {
            item: "Chair",
            description: "Broken leg",
            cost: 2500,
            image: "/placeholder.svg?height=120&width=120",
          },
        ],
      },
    },
  },
  {
    regNumber: "BUS-242-094/2022",
    name: "Jane Smith",
    email: "jane.smith@mmu.ac.ke",
    phone: "+254712345679",
    program: "BBIT",
    faculty: "BBIT",
    year: 4,
    profileImage: "/placeholder.svg?height=150&width=150",
    clearance: {
      finance: {
        status: "completed",
        comment: "",
      },
      library: {
        status: "pending",
        comment: "",
      },
      academic: {
        status: "completed",
        comment: "",
      },
      admin: {
        status: "pending",
        comment: "",
      },
      hostel: {
        status: "pending",
        comment: "",
      },
      sports: {
        status: "pending",
        comment: "",
      },
      health: {
        status: "pending",
        comment: "",
      },
      examinations: {
        status: "pending",
        comment: "",
      },
    },
    departmentInfo: {
      library: {
        unreturnedBooks: [],
      },
      academic: {
        attendance: [
          { code: "BIT 4101", name: "Advanced Database Systems", attendance: 90 },
          { code: "BIT 4102", name: "Software Engineering", attendance: 85 },
          { code: "BIT 4103", name: "Computer Networks", attendance: 95 },
        ],
      },
      finance: {
        balance: 0,
      },
    },
  },
  {
    regNumber: "BUS-242-040/2021",
    name: "Michael Johnson",
    email: "michael.j@mmu.ac.ke",
    phone: "+254712345680",
    program: "FAMECO",
    faculty: "FAMECO",
    year: 4,
    profileImage: "/placeholder.svg?height=150&width=150",
    clearance: {
      finance: {
        status: "completed",
        comment: "",
      },
      library: {
        status: "completed",
        comment: "",
      },
      academic: {
        status: "completed",
        comment: "",
      },
      admin: {
        status: "completed",
        comment: "",
      },
      hostel: {
        status: "completed",
        comment: "",
      },
      sports: {
        status: "completed",
        comment: "",
      },
      health: {
        status: "completed",
        comment: "",
      },
      examinations: {
        status: "completed",
        comment: "",
      },
    },
  },
]

// Mock department data
export const mockDepartmentData = {
  finance: {
    id: "finance",
    name: "Finance Department",
    requirements: [
      "All tuition fees must be paid in full",
      "No outstanding balances from previous semesters",
      "All financial aid documents must be submitted",
    ],
    rejectionReasons: [
      { id: "unpaid-fees", title: "Unpaid Fees", description: "Outstanding tuition fees balance" },
      { id: "missing-docs", title: "Missing Documents", description: "Required financial documents not submitted" },
      { id: "invalid-payment", title: "Invalid Payment", description: "Payment proof not verifiable or insufficient" },
    ],
  },
  library: {
    id: "library",
    name: "Library Department",
    requirements: [
      "All borrowed books must be returned",
      "No outstanding fines for late returns",
      "All research materials must be properly checked in",
    ],
    rejectionReasons: [
      { id: "unreturned-books", title: "Unreturned Books", description: "Books not returned to the library" },
      { id: "unpaid-fines", title: "Unpaid Fines", description: "Outstanding fines for late returns" },
      { id: "damaged-books", title: "Damaged Books", description: "Books returned in damaged condition" },
    ],
  },
  academic: {
    id: "academic",
    name: "Academic Department",
    requirements: [
      "Minimum attendance of 75% in all courses",
      "No incomplete grades in any course",
      "All academic warnings must be resolved",
    ],
    rejectionReasons: [
      { id: "low-attendance", title: "Low Attendance", description: "Attendance below required threshold" },
      { id: "incomplete-grades", title: "Incomplete Grades", description: "Missing grades in some courses" },
      { id: "academic-warning", title: "Academic Warning", description: "Student has unresolved academic warnings" },
    ],
  },
  admin: {
    id: "admin",
    name: "Administration",
    requirements: [
      "All administrative forms must be submitted",
      "Student ID must be valid and up to date",
      "No pending disciplinary issues",
    ],
    rejectionReasons: [
      { id: "missing-forms", title: "Missing Forms", description: "Required administrative forms not submitted" },
      { id: "invalid-id", title: "Invalid ID", description: "Student ID is expired or invalid" },
      { id: "disciplinary-issues", title: "Disciplinary Issues", description: "Unresolved disciplinary issues" },
    ],
  },
  hostel: {
    id: "hostel",
    name: "Hostel Department",
    requirements: [
      "Room must be inspected and cleared",
      "All hostel fees must be paid",
      "No damages to hostel property",
    ],
    rejectionReasons: [
      { id: "room-damage", title: "Room Damage", description: "Damage to hostel property found" },
      { id: "unpaid-hostel-fees", title: "Unpaid Hostel Fees", description: "Outstanding hostel fees balance" },
      { id: "inspection-failed", title: "Inspection Failed", description: "Room inspection not passed" },
    ],
  },
  sports: {
    id: "sports",
    name: "Sports Department",
    requirements: [
      "All sports equipment must be returned",
      "Participation in required sports activities",
      "No outstanding sports fees",
    ],
    rejectionReasons: [
      { id: "equipment-not-returned", title: "Equipment Not Returned", description: "Sports equipment not returned" },
      { id: "participation-low", title: "Low Participation", description: "Insufficient participation in sports" },
      { id: "sports-fees-unpaid", title: "Unpaid Sports Fees", description: "Outstanding sports fees" },
    ],
  },
  health: {
    id: "health",
    name: "Health Center",
    requirements: [
      "Medical insurance must be up to date",
      "All medical reports must be submitted",
      "No outstanding medical bills",
    ],
    rejectionReasons: [
      { id: "insurance-expired", title: "Insurance Expired", description: "Medical insurance not up to date" },
      {
        id: "medical-reports-missing",
        title: "Missing Reports",
        description: "Required medical reports not submitted",
      },
      { id: "medical-bills-unpaid", title: "Unpaid Bills", description: "Outstanding medical bills" },
    ],
  },
  examinations: {
    id: "examinations",
    name: "Examinations Office",
    requirements: [
      "No examination irregularities",
      "All examination fees must be paid",
      "All required examination documents submitted",
    ],
    rejectionReasons: [
      { id: "irregularities", title: "Examination Irregularities", description: "Pending examination irregularities" },
      { id: "exam-fees-unpaid", title: "Unpaid Exam Fees", description: "Outstanding examination fees" },
      {
        id: "documents-missing",
        title: "Missing Documents",
        description: "Required examination documents not submitted",
      },
    ],
  },
}
