import { v4 as uuid } from "uuid"
import { Job, Candidate, Assessment } from "../types/models"

export const seedJobs: Job[] = [
  {
    id: uuid(), title: "Frontend Engineer", status: "active",
    description: "Work on building modern, scalable React applications.",
    tags: [],
    createAt: "",
    createdAt: ""
  },
  {
    id: uuid(), title: "Backend Engineer", status: "archived",
    description: "Design and maintain REST APIs with Node.js and databases.",
    tags: [],
    createAt: "",
    createdAt: ""
  },
   {
     id: uuid(),
     title: "Full-Stack Developer",
     status: "active",
     description: "Develop both client and server-side software for our cloud platform.",
     tags: ["React", "Node.js", "AWS"],
     createAt: new Date().toISOString(),
     createdAt: ""
   },
  {
    id: uuid(),
    title: "UI/UX Designer",
    status: "active",
    description: "Create user-centered designs and intuitive interfaces for our products.",
    tags: ["Figma", "User Research"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "DevOps Engineer",
    status: "active",
    description: "Manage CI/CD pipelines, automation, and infrastructure.",
    tags: ["Docker", "Kubernetes", "CI/CD"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Product Manager",
    status: "active",
    description: "Define product vision, strategy, and roadmap for new features.",
    tags: ["Agile", "Roadmap"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Data Scientist",
    status: "archived",
    description: "Analyze large datasets to extract meaningful insights and build models.",
    tags: ["Python", "Machine Learning"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "QA Engineer",
    status: "active",
    description: "Develop and execute automated and manual tests to ensure quality.",
    tags: ["Automation", "Testing"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Mobile Developer (iOS)",
    status: "active",
    description: "Build and maintain our native iOS application using Swift.",
    tags: ["iOS", "Swift"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Cloud Architect",
    status: "active",
    description: "Design and oversee our company's cloud computing strategy on AWS.",
    tags: ["AWS", "Architecture"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Site Reliability Engineer (SRE)",
    status: "archived",
    description: "Focus on reliability, scalability, and performance of our systems.",
    tags: ["SRE", "Linux"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Technical Writer",
    status: "active",
    description: "Create clear, concise, and comprehensive technical documentation.",
    tags: ["Documentation", "API"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Cybersecurity Analyst",
    status: "active",
    description: "Protect our systems by identifying and mitigating security vulnerabilities.",
    tags: ["Security", "Networking"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Scrum Master",
    status: "active",
    description: "Facilitate agile development processes and remove team impediments.",
    tags: ["Scrum", "Agile"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Database Administrator",
    status: "active",
    description: "Manage, monitor, and maintain our company's database systems.",
    tags: ["SQL", "PostgreSQL"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Machine Learning Engineer",
    status: "archived",
    description: "Design and implement machine learning models into production.",
    tags: ["ML", "Python", "TensorFlow"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Solutions Architect",
    status: "active",
    description: "Bridge the gap between business problems and technology solutions.",
    tags: ["Architecture", "Sales"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Data Analyst",
    status: "active",
    description: "Interpret data and turn it into information that offers ways to improve the business.",
    tags: ["SQL", "Tableau"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Business Analyst",
    status: "active",
    description: "Analyze business processes and identify opportunities for improvement.",
    tags: ["Analysis", "Requirements Gathering"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Android Developer",
    status: "active",
    description: "Develop advanced applications for the Android platform using Kotlin.",
    tags: ["Android", "Kotlin"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Network Engineer",
    status: "archived",
    description: "Maintain and administer computer networks and related computing environments.",
    tags: ["Networking", "Cisco"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Systems Administrator",
    status: "active",
    description: "Responsible for the maintenance, configuration, and reliable operation of computer systems.",
    tags: ["Linux", "SysAdmin"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Digital Marketing Manager",
    status: "active",
    description: "Lead our digital marketing campaigns from conception to execution.",
    tags: ["SEO", "Marketing"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "UX Researcher",
    status: "active",
    description: "Conduct user research to inform product design and strategy.",
    tags: ["Research", "UX"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "IT Support Specialist",
    status: "active",
    description: "Provide technical assistance and support to our employees.",
    tags: ["Support", "IT"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Lead Software Engineer",
    status: "archived",
    description: "Lead a team of engineers to build and ship high-quality software.",
    tags: ["Leadership", "Architecture"],
    createAt: new Date().toISOString(),
    createdAt: ""
  },
  {
    id: uuid(),
    title: "Junior Web Developer",
    status: "active",
    description: "Assist the development team in building and maintaining web applications.",
    tags: ["HTML", "CSS", "JavaScript"],
    createAt: new Date().toISOString(),
    createdAt: ""
  }
]

export const seedCandidates: Candidate[] = [
  {
    id: uuid(), name: "Alice Johnson", role: "Frontend Engineer",
    bio: "Passionate React developer with 3 years of experience.",
    email: "alice.johnson@example.com",
    appliedRole: undefined
  },
  {
    id: uuid(), name: "Bob Smith", role: "Backend Engineer",
    bio: "Specializes in Node.js and database optimization.",
    email: "bob.smith@example.com",
    appliedRole: undefined
  },
]

export const seedAssessments: Assessment[] = [
  {
    id: uuid(), title: "React Basics Quiz", questions: ["What is JSX?"],
    description: "A short quiz to test basic React fundametals."
  },
  {
    id: uuid(), title: "Database Fundamentals", questions: ["What is normalization?"],
    description: "covers basic concepts of database concepts."
  },
]
