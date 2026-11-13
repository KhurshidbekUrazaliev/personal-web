export interface SkillGroup {
  title: string;
  tools: string[];
  /** The projects these tools were used in, as one readable line. */
  usedIn?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
}
