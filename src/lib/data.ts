import type { LucideIcon } from "lucide-react";
import {
  Heart,
  Briefcase,
  Scale,
  BrainCircuit,
  UserCircle,
  HeartPulse,
  Code2,
  Landmark,
  PenSquare,
  Plane,
} from "lucide-react";

export type ConsultantMode = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export type AIModel = {
  id: string;
  name: string;
  bio: string;
};

export const consultantModes: ConsultantMode[] = [
  {
    id: "relationship",
    name: "Relationship",
    description: "Advice on personal connections and dating.",
    icon: Heart,
  },
  {
    id: "business",
    name: "Business & Startup",
    description: "Guidance on strategy, growth, and operations.",
    icon: Briefcase,
  },
  {
    id: "legal",
    name: "Legal Consultant",
    description: "General information (not a substitute for legal counsel).",
    icon: Scale,
  },
  {
    id: "wellness",
    name: "Mental Wellness",
    description: "A supportive guide for mindfulness and well-being.",
    icon: BrainCircuit,
  },
  {
    id: "career",
    name: "Career & CV Advisor",
    description: "Tips for job hunting, interviews, and resume building.",
    icon: UserCircle,
  },
  {
    id: "health",
    name: "Health & Fitness",
    description: "Motivation and tips for a healthy lifestyle (not medical advice).",
    icon: HeartPulse,
  },
  {
    id: "tech",
    name: "Tech & Coding Tutor",
    description: "Help with programming concepts and tech questions.",
    icon: Code2,
  },
  {
    id: "finance",
    name: "Personal Finance",
    description: "Guidance on budgeting, saving, and investing.",
    icon: Landmark,
  },
  {
    id: "writing",
    name: "Creative Writing",
    description: "Coaching to overcome writer's block and improve skills.",
    icon: PenSquare,
  },
  {
    id: "travel",
    name: "Travel & Lifestyle",
    description: "Planning for your next adventure or lifestyle change.",
    icon: Plane,
  },
];

export const aiModels: AIModel[] = [
  {
    id: "elena",
    name: "Elena",
    bio: "The Empathetic Listener. Ideal for Relationships, Wellness.",
  },
  {
    id: "roy",
    name: "Roy",
    bio: "The Analytical Strategist. Ideal for Business, Finance, Tech.",
  },
  {
    id: "sophia",
    name: "Sophia",
    bio: "The Creative Muse. Ideal for Writing, Travel, Lifestyle.",
  },
  {
    id: "david",
    name: "David",
    bio: "The Practical Problem-Solver. Ideal for Career, Law.",
  },
  {
    id: "zara",
    name: "Zara",
    bio: "The Energetic Motivator. Ideal for Fitness, Quick Advice.",
  },
  {
    id: "anya",
    name: "Dr. Anya Sharma",
    bio: "The Scholarly Sage. Excels in academic and technical queries.",
  },
];
