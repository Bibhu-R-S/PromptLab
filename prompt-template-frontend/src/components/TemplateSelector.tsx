import type { PromptTemplate } from "../data/templates";

type TemplateSelectorProps = {
  templates: PromptTemplate[];
  selectedTemplateId: string;
  onSelect: (templateId: string) => void;
};

function TemplateSelector({
  templates,
  selectedTemplateId,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div>
      <label
        htmlFor="template"
        className="text-label mb-2 block text-sm font-medium"
      >
        Choose a template
      </label>

      <select
        id="template"
        value={selectedTemplateId}
        onChange={(event) => onSelect(event.target.value)}
        className="form-control w-full rounded-lg border px-3 py-3 text-sm"
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>

      {templates.map((template) =>
        template.id === selectedTemplateId ? (
          <p
            key={template.id}
            className="template-description mt-2 text-sm leading-6"
          >
            {template.description}
          </p>
        ) : null,
      )}
    </div>
  );
}

export default TemplateSelector;
