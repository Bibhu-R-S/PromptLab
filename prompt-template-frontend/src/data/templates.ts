export type PromptTemplate = {
  id: string;
  name: string;
  description: string;
  variables: string[];
  template: string;
};

export const templates: PromptTemplate[] = [
  {
    id: "explain-topic",
    name: "Explain a Topic",
    description: "Explain a concept for a specific audience.",
    template:
      "Explain {topic} to {audience} using a {style} style. Include a practical example.",
    variables: ["topic", "audience", "style"],
  },
  {
    id: "linkedin-post",
    name: "LinkedIn Post",
    description: "Create a professional LinkedIn post.",
    template:
      "Write a LinkedIn post about {topic} for {audience}. Use a {tone} tone and keep it under {wordCount} words.",
    variables: ["topic", "audience", "tone", "wordCount"],
  },
  {
    id: "study-plan",
    name: "Study Plan",
    description: "Create a structured learning plan.",
    template:
      "Create a {duration}-day study plan for learning {subject}. The learner is at {level} level and can study {hours} hours per day.",
    variables: ["duration", "subject", "level", "hours"],
  },
];
