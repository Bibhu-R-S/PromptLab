import type { PromptTemplate } from "../data/templates";

type TemplateFormProps = {
  template: PromptTemplate;
  values: Record<string, string>;
  onChange: (variable: string, value: string) => void;
};

function TemplateForm({ template, values, onChange }: TemplateFormProps) {
  return (
    <div className="mt-6 space-y-5">
      {template.variables.map((variable) => (
        <div key={variable}>
          <label
            htmlFor={variable}
            className="text-label mb-2 block text-sm font-medium"
          >
            {variable
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (char) => char.toUpperCase())}
          </label>

          <input
            id={variable}
            type="text"
            value={values[variable] ?? ""}
            onChange={(event) => onChange(variable, event.target.value)}
            placeholder={`Enter ${variable}...`}
            className="form-control w-full rounded-lg border px-3 py-3 text-sm outline-none"
          />
        </div>
      ))}
    </div>
  );
}

export default TemplateForm;
