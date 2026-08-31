export const socialLinks = {
  github: "https://github.com/Sanjay-Git-0510",
  linkedin: "https://linkedin.com/in/sanjay-c-374360330",
  email: "sanjayc9824@gmail.com",
  phone: "+91 76761 26231",
};

export const projects = [
  {
    number: "01",
    title: "InterviewReady",
    subtitle: "AI Interview Platform",
    description:
      "Role-specific interview preparation with AI-generated questions across 22+ domains. Answers are scored from 0–10 with feedback on strengths, weaknesses, and missing concepts, then tracked over time.",
    technologies: ["Node.js", "Express.js", "MongoDB", "Google Gemini API"],
    capabilities: ["Dynamic question generation", "Evaluation and scoring", "Performance analytics"],
    visualLabel: "Fig. 02 — evaluation flow",
    visualSteps: ["Role selection", "AI question generation", "Interview session", "Answer evaluation", "Score + analytics"],
  },
  {
    number: "02",
    title: "SecureChat",
    subtitle: "Real-Time Secure Messaging",
    description:
      "One-to-one and group messaging over Socket.io, with JWT authentication, bcrypt password hashing, role-based administrative controls, protected API routes, and cloud-based message storage.",
    technologies: ["Node.js", "Express.js", "Socket.io", "JWT", "bcrypt", "MongoDB Atlas"],
    capabilities: ["Typing indicators", "Role-based controls", "Postman API workflow testing"],
    visualLabel: "Fig. 03 — secure path",
    visualSteps: ["User", "JWT + bcrypt", "Server", "Socket.io", "Atlas store"],
  },
];

export const skillGroups = {
  Backend: ["Node.js", "Express.js", "REST APIs", "Middleware", "JWT", "Authentication", "Authorization", "API Design", "Rate Limiting", "Transactions", "Connection Pooling"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "SQL", "Caching", "Indexing"],
  Cybersecurity: ["Burp Suite", "Nmap", "Wireshark", "Metasploit", "Kali Linux", "Cryptography", "Network Security"],
  "Core CS": ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Object-Oriented Programming", "Linux"],
  Testing: ["Jest", "Postman", "Git", "GitHub", "VS Code", "LeetCode"],
  Languages: ["JavaScript", "Python", "C", "C++", "SQL"],
} as const;

export const journey = [
  { period: "2022 — 2024", title: "Pre-University", detail: "Shree Vijaya PU College · Chintamani · 97%", tone: "vermilion" },
  { period: "2024 — Present", title: "B.E. Computer Science", detail: "B.M.S. College of Engineering · IoT, Cybersecurity & Blockchain · CGPA 8.0/10", tone: "ink" },
  { period: "Build", title: "InterviewReady & SecureChat", detail: "Two backend-focused full-stack projects developed end to end.", tone: "vermilion" },
  { period: "Practice", title: "CTF & problem solving", detail: "picoCTF roadmap · LeetCode · Hack2Hire · CTF competitions · technical workshops", tone: "acid" },
] as const;

export const activities = ["picoCTF", "TryHackMe", "OverTheWire", "Hack The Box", "LeetCode", "Hack2Hire", "CTF competitions", "Technical workshops"];