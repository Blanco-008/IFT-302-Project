/* ============================================================
   DATA.JS — IFT 302 Group 1 (Nile University of Nigeria)
   ------------------------------------------------------------
   THIS IS THE HEART OF THE WEBSITE.

   All student profiles live in this simple array of objects.
   The homepage (index.html) loads this array and builds every
   member card automatically — no HTML editing needed to add
   or remove a member.

   HOW TO UPDATE A MEMBER:
   1. Open data.js in any text editor.
   2. Find the member object you want (each has an "id").
   3. Edit the fields: name, role, photo, bio, skills, projects, email, github.
   4. Save the file and refresh the browser page.

   HOW TO ADD A NEW MEMBER:
   - Copy an existing member object inside the array.
   - Change the id and fill in the details.
   - Save — the new card appears automatically on the site.

   HOW TO REMOVE A MEMBER:
   - Delete their object from the array.

   HOW THE EDIT/UPDATE SECTION WORKS:
   - The on-page form (index.html) can pre-fill this data.
   - You press "Preview" to see changes instantly.
   - You press "Save Changes" to write the updated values back
     into this array, then click "Reload Preview" to see the card.

   NOTE: There is no database or backend. This is a static site —
   all data lives in this one file.
   ============================================================ */

const groupMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "AJ",
    bio: "BSc Computer Science student at Nile University of Nigeria who loves building web applications and turning classroom theory into real projects.",
    skills: ["JavaScript", "React", "Node.js", "CSS"],
    projects: [
      { title: "Campus Event Hub", description: "Web platform that helps students discover, RSVP for and manage campus events." },
      { title: "StudyVault", description: "Flashcard study app that lets students create decks and run quizzes." },
      { title: "TaskFlow", description: "Productivity app for creating tasks, setting priorities and tracking goals." }
    ],
    email: "alex.johnson@example.com",
    github: "https://github.com/alexjohnson-dev"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "SC",
    bio: "CS student at Nile University focused on backend development, databases and building reliable software.",
    skills: ["Python", "Django", "SQL", "JavaScript"],
    projects: [
      { title: "StudyBuddy API", description: "REST API for a study-group matching platform." },
      { title: "Campus Data Dashboard", description: "Dashboard visualising student activity and resource usage." }
    ],
    email: "sarah.chen@example.com",
    github: "https://github.com/sarahchen-dev"
  },
  {
    id: 3,
    name: "David Okafor",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "DO",
    bio: "CS student with a strong interest in software engineering fundamentals and clean code.",
    skills: ["Java", "Git", "JavaScript", "SQL"],
    projects: [
      { title: "Library Management System", description: "Desktop-style app for managing book lending records." },
      { title: "Task Manager CLI", description: "Command-line task tracker with priority levels." }
    ],
    email: "david.okafor@example.com",
    github: "https://github.com/davidokafor-dev"
  },
  {
    id: 4,
    name: "Fatima Rahman",
    role: "Computer Science Student",
    year: "200 Level",
    photo: "FR",
    bio: "CS student who enjoys UI/UX design and front-end development, blending creativity with code.",
    skills: ["HTML", "CSS", "JavaScript", "Figma"],
    projects: [
      { title: "Portfolio Redesign", description: "Rebuilt a personal portfolio with responsive modern layouts." },
      { title: "Event Landing Page", description: "Marketing landing page for a student club event." }
    ],
    email: "fatima.rahman@example.com",
    github: "https://github.com/fatimarahman-dev"
  },
  {
    id: 5,
    name: "Michael Adeyemi",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "MA",
    bio: "CS student interested in data, algorithms and performance-driven applications.",
    skills: ["Python", "C++", "MySQL", "Data Structures"],
    projects: [
      { title: "Algo Visualiser", description: "Interactive visualiser for sorting and graph algorithms." },
      { title: "Data Analysis Toolkit", description: "Tool for cleaning and analysing student survey data." }
    ],
    email: "michael.adeyemi@example.com",
    github: "https://github.com/michaeladeyemi-dev"
  },
  {
    id: 6,
    name: "Grace Nwosu",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "GN",
    bio: "CS student passionate about mobile-style web apps and real-time features.",
    skills: ["React", "Firebase", "JavaScript", "CSS"],
    projects: [
      { title: "StudyVault", description: "Flashcard app with real-time sync across devices." },
      { title: "Class Notes Share", description: "App for sharing and annotating class notes." }
    ],
    email: "grace.nwosu@example.com",
    github: "https://github.com/gracenwosu-dev"
  },
  {
    id: 7,
    name: "Daniel Eze",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "DE",
    bio: "CS student focused on full-stack development and API design.",
    skills: ["Node.js", "Express", "MongoDB", "React"],
    projects: [
      { title: "Campus Event Hub", description: "Full-stack event management platform (backend + frontend)." },
      { title: "REST API Gateway", description: "Simple gateway for student service APIs." }
    ],
    email: "daniel.eze@example.com",
    github: "https://github.com/danieleze-dev"
  },
  {
    id: 8,
    name: "Hannah Bello",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "HB",
    bio: "CS student interested in data science, machine learning and intelligent systems.",
    skills: ["Python", "SQL", "Machine Learning", "Statistics"],
    projects: [
      { title: "Student Performance Model", description: "Predictive model for student performance trends." },
      { title: "Survey Analytics", description: "Analytics dashboard for course feedback surveys." }
    ],
    email: "hannah.bello@example.com",
    github: "https://github.com/hannahbello-dev"
  },
  {
    id: 9,
    name: "Samuel Osei",
    role: "Computer Science Student",
    year: "300 Level",
    photo: "SO",
    bio: "CS student with interests in cloud deployment, testing and DevOps practices.",
    skills: ["Docker", "AWS", "CI/CD", "Testing"],
    projects: [
      { title: "Deploy Pipeline", description: "CI/CD pipeline that builds and deploys web apps automatically." },
      { title: "Containerised App", description: "Dockerised full-stack student app for local deployment." }
    ],
    email: "samuel.osei@example.com",
    github: "https://github.com/samuelosei-dev"
  }
];
