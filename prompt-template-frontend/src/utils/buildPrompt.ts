export function buildPrompt(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, variable: string) => {
    const value = values[variable]?.trim();

    return value || placeholder;
  });
}
