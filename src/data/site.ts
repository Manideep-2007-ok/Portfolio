export const site = {
  name: 'Manideep Thumu',
  role: 'ML / AI engineering student',
  pitch: 'I build LLM systems and measure whether they work.',
  availability: 'Open to ML/AI internships — remote',
  location: 'Bengaluru, IN',
  timezone: 'Asia/Kolkata',
  email: 'manideepthumu3@gmail.com',
  links: {
    github: 'https://github.com/Manideep-2007-ok',
    linkedin: 'https://www.linkedin.com/in/manideep-thumu-a39b99383',
    resume: null as string | null, // TODO: set to `${BASE_URL}resume.pdf` once public/resume.pdf exists
    codeforces: null as string | null, // TODO
    source: 'https://github.com/Manideep-2007-ok/Portfolio',
  },
  education: [
    { school: 'Scaler School of Technology', detail: null as string | null, until: 2029 },
    { school: 'IIT Madras', detail: 'BS Data Science' as string | null, until: 2029 },
  ],
  skills: {
    using: ['Python', 'SQL', 'FastAPI', 'Pydantic', 'Docker', 'LangGraph', 'RAG', 'ChromaDB'],
    learning: ['pandas', 'LightGBM', 'PyTorch', 'LLM evals'],
  },
};
