import { describe, expect, it } from "vitest";
import { buildPrompt } from "./buildPrompt";

describe("buildPrompt", () => {
  it("replaces all placeholders with supplied values", () => {
    const result = buildPrompt(
      "Explain {topic} to {audience} in a {style} style.",
      {
        topic: "Binary Search",
        audience: "beginners",
        style: "simple",
      },
    );

    expect(result).toBe(
      "Explain Binary Search to beginners in a simple style.",
    );
  });

  it("keeps placeholders when values are missing", () => {
    const result = buildPrompt("Explain {topic} to {audience}.", {
      topic: "React",
    });

    expect(result).toBe("Explain React to {audience}.");
  });

  it("trims surrounding whitespace from values", () => {
    const result = buildPrompt("Learn {topic}.", {
      topic: "  TypeScript  ",
    });

    expect(result).toBe("Learn TypeScript.");
  });

  it("preserves placeholders for whitespace-only values", () => {
    const result = buildPrompt("Learn {topic}.", {
      topic: "   ",
    });

    expect(result).toBe("Learn {topic}.");
  });
});
