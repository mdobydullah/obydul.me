export type ResumeRole = {
  title: string;
  period: string;
  tenure?: string;
  highlights: string[];
};

export type ResumeCompany = {
  company: string;
  link?: string;
  location?: string;
  period: string;
  type?: string;
  roles: ResumeRole[];
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  location?: string;
};

export type Language = {
  name: string;
  level: string;
};

export type Certification = {
  name: string;
  issuer: string;
  note?: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type Resume = {
  name: string;
  headline: string;
  location: string;
  email: string;
  links: ContactLink[];
  summary: string;
  experience: ResumeCompany[];
  skills: SkillGroup[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
  featuredProjects: string[];
};

export const RESUME: Resume = {
  name: "Md Obydullah",
  headline: "Senior Software Engineer",
  location: "Remote · Worldwide",
  email: "hi@obydul.me",
  links: [
    { label: "obydul.me", href: "https://obydul.me" },
    { label: "GitHub", href: "https://github.com/mdobydullah" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/obydul/" },
  ],
  summary:
    "9+ years building and operating production systems. Lead engineer at Electronic First (electronicfirst.com) for the last 5+ years. Strong on backend, AWS at scale, security, and applied AI. Currently shipping AI features into real products without losing what already works.",
  experience: [
    {
      company: "Electronic First",
      link: "https://electronicfirst.com",
      location: "Remote (employer based in Fujairah, UAE)",
      period: "Jan 2017 – Present",
      type: "Full-time, 9+ years",
      roles: [
        {
          title: "Lead Software Engineer",
          period: "Jan 2021 – Present",
          tenure: "5+ yrs",
          highlights: [
            "Lead a 9-person distributed engineering team across Bangladesh and India. Reviewed 400+ CVs and personally hired 7 developers.",
            "Own production AWS for 6+ years end-to-end: EKS, RDS Multi-AZ, ECR, Cloudflare. Cost-first scaling: offload logs to S3 + ClickHouse instead of upsizing the writer.",
            "Defended the platform against multi-million-hit bot / DDoS attacks; tuned Cloudflare WAF by hand. Run own pentests; found and fixed cart session hijack and rate-limit gaps.",
            "Designed and shipped Pulse: internal multi-platform AI agent on OpenAI's tool-use API. TypeScript, Node 22+, adapter pattern, typed tools per capability. Live on Discord, Telegram + WhatsApp planned.",
            "Built Go microservices on EKS that replaced legacy Laravel jobs: Merchant Center Feeds (queries 2M → 240, full sync 7d → 10min, image 200MB → 20MB), Provider Price Sync (auto-routes cheapest supplier across 4 external APIs), Product Feeds Generator (60s → 20s/feed, RDS CPU 99% → negligible).",
            "Multi-country operating environment: weekly leadership syncs in English with London-based senior management; team and partners across UK, UAE, BD, IN, PH, EG.",
          ],
        },
        {
          title: "Laravel Developer",
          period: "Jan 2019 – Dec 2020",
          tenure: "2 yrs",
          highlights: [
            "Solo-rebuilt electronicfirst.com from WordPress to Laravel. Ran WordPress in parallel for ~1 year for a safe, feature-by-feature migration. Zero-data-loss cutover.",
            "Built the core platform features that the team I now lead continues to extend.",
          ],
        },
        {
          title: "WordPress Developer",
          period: "Jan 2017 – Dec 2018",
          tenure: "2 yrs",
          highlights: [
            "Maintained and extended the legacy WordPress storefront and prepared the ground for the Laravel migration.",
          ],
        },
      ],
    },
    {
      company: "Upwork",
      location: "Remote",
      period: "Sep 2017 – Jan 2020",
      type: "Freelance",
      roles: [
        {
          title: "Web & Android Developer (Top Rated)",
          period: "Sep 2017 – Jan 2020",
          highlights: [
            "Top Rated freelancer. Web and Android delivery for international clients.",
          ],
        },
      ],
    },
    {
      company: "Fiverr",
      location: "Remote",
      period: "Nov 2016 – Jan 2020",
      type: "Freelance",
      roles: [
        {
          title: "Web & Android Developer (Level 2)",
          period: "Nov 2016 – Jan 2020",
          highlights: [
            "Level 2 seller. Web and Android delivery for international clients.",
          ],
        },
      ],
    },
    {
      company: "Makpie",
      location: "Bangladesh",
      period: "Apr 2016 – Dec 2020",
      type: "Co-Founder",
      roles: [
        {
          title: "Co-Founder, Builder",
          period: "Apr 2016 – Dec 2020",
          tenure: "4 yrs 9 mos",
          highlights: [
            "Co-founded Bangladesh's first blood-donor search engine. Built the product, ran it, and shut it down deliberately rather than letting it rot. Owned a product end-to-end including the unglamorous part.",
          ],
        },
      ],
    },
  ],
  skills: [
    {
      group: "Programming",
      items: [
        "Go",
        "TypeScript",
        "JavaScript",
        "Python",
        "PHP",
        "SQL",
        "HTML / CSS",
        "Bash",
      ],
    },
    {
      group: "Backend",
      items: ["Laravel", "NestJS", "Django", "FastAPI", "Flask", "Express"],
    },
    {
      group: "Cloud & DevOps",
      items: [
        "AWS (EKS, RDS, S3, SQS, ECR, Lambda)",
        "Kubernetes",
        "Argo CD",
        "Terraform",
        "Docker",
        "GitHub Actions",
        "Cloudflare",
      ],
    },
    {
      group: "Databases & Data",
      items: [
        "MySQL",
        "PostgreSQL",
        "Redis",
        "ClickHouse",
        "DynamoDB",
        "Kafka",
        "Airflow",
        "Debezium",
      ],
    },
    {
      group: "AI / ML",
      items: [
        "OpenAI tool-use",
        "LangChain",
        "LlamaIndex",
        "RAG pipelines",
        "Vector DBs (Pinecone, Qdrant, pgvector)",
        "MCP / FastMCP",
        "Hugging Face",
      ],
    },
    {
      group: "Security",
      items: [
        "CEH v12 (course)",
        "Cloudflare WAF",
        "Burp Suite",
        "Pentesting (own platform)",
        "Web app security",
      ],
    },
    {
      group: "Observability",
      items: ["Grafana", "Loki", "Prometheus", "Datadog", "Sentry", "PostHog"],
    },
    {
      group: "Frontend",
      items: ["Next.js", "Vue.js", "TailwindCSS"],
    },
  ],
  education: [
    {
      institution: "Daffodil International University",
      degree: "BSc, Computer Science & Engineering",
      period: "May 2014 – May 2018",
      location: "Dhaka, Bangladesh",
    },
  ],
  languages: [
    {
      name: "English",
      level: "Professional (daily work with London-based senior leadership)",
    },
    { name: "Bengali", level: "Native" },
  ],
  certifications: [
    {
      name: "Certified Ethical Hacker v12",
      issuer: "EC-Council",
      note: "Course completed (full syllabus). Did not sit the exam.",
    },
  ],
  featuredProjects: [
    "merchant-center-feeds",
    "provider-price-sync",
    "pulse-ai-agent",
    "cloud-platform",
  ],
};
