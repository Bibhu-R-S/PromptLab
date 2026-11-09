import { useState } from "react";
import { templates } from "./data/templates";
import TemplateSelector from "./components/TemplateSelector";
import TemplateForm from "./components/TemplateForm";
import { buildPrompt } from "./utils/buildPrompt";
import { generateAIResponse } from "./services/ai";

function App() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);

  const [values, setValues] = useState<Record<string, string>>({});

  const [copyStatus, setCopyStatus] = useState("");

  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  const selectedTemplate = templates.find(
    (template) => template.id === selectedTemplateId,
  )!;

  const generatedPrompt = buildPrompt(selectedTemplate.template, values);

  const hasMissingValues = selectedTemplate.variables.some(
    (variable) => !values[variable]?.trim(),
  );

  function handleValueChange(variable: string, value: string) {
    setValues((previousValues) => ({
      ...previousValues,
      [variable]: value,
    }));
  }

  function handleTemplateChange(templateId: string) {
    setSelectedTemplateId(templateId);
    setValues({});
    setCopyStatus("");
    setAiResponse("");
    setAiError("");
  }

  async function handleGenerate() {
    if (hasMissingValues || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setAiError("");
    setAiResponse("");

    try {
      const result = await generateAIResponse(generatedPrompt);
      setAiResponse(result);
    } catch (error) {
      setAiError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleCopy() {
    if (hasMissingValues) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus("Copy failed. Please copy manually.");
    }
  }

  function handleReset() {
    setValues({});
    setCopyStatus("");
    setAiResponse("");
    setAiError("");
  }
  return (
    <div className="app-shell">
      <header className="app-header border-b sticky top-0 z-10 backdrop-blur">
        <div className="app-header-inner mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="brand-mark">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                PromptLab
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Prompt Template Playground
              </p>
            </div>
          </div>
          <span className="version-pill rounded-full border px-3 py-1 text-xs">
            Version 1.0
          </span>
        </div>
      </header>

      <main className="app-main mx-auto px-6 py-12">
        <section className="mb-10">
          <p className="eyebrow mb-3 font-semibold uppercase">
            YOUR PROMPT WORKSPACE
          </p>
          <h2 className="page-title text-3xl font-semibold sm:text-4xl">
            Build better prompts.
          </h2>
          <p className="page-description mt-4 max-w-2xl leading-7">
            Choose a template, customize its variables, and preview your prompt
            before using it with an AI model.
          </p>
        </section>

        <section className="workspace-grid grid md:grid-cols-2">
          <div className="workspace-panel rounded-xl border p-6">
            <h3 className="panel-title mb-6 text-lg font-semibold">
              1. Configure your prompt
            </h3>

            <TemplateSelector
              templates={templates}
              selectedTemplateId={selectedTemplateId}
              onSelect={handleTemplateChange}
            />

            <TemplateForm
              template={selectedTemplate}
              values={values}
              onChange={handleValueChange}
            />
          </div>

          <div className="workspace-panel rounded-xl border p-6">
            <div className="preview-toolbar flex justify-between gap-3">
              <h3 className="panel-title text-lg font-semibold">
                2. Prompt preview
              </h3>
              <div className="preview-actions flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={hasMissingValues}
                  className="action-button primary-action rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Copy prompt
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="action-button secondary-action rounded-lg border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={hasMissingValues || isGenerating}
                  className="action-button generate-action rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </button>

                {copyStatus && (
                  <span
                    role="status"
                    aria-live="polite"
                    className="text-sm text-slate-500"
                  >
                    {copyStatus}
                  </span>
                )}
              </div>
              <span
                className={`ready-pill rounded-full px-2.5 py-1 text-xs ${
                  hasMissingValues
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-emerald-500/10 text-emerald-400"
                }`}
              >
                {hasMissingValues ? "Incomplete" : "Ready"}
              </span>
            </div>

            <p className="template-description mt-2 text-sm leading-6">
              Your prompt updates as you type.
            </p>

            <div className="preview-copy mt-6 min-h-48 whitespace-pre-wrap break-words rounded-lg border p-4 font-mono leading-7">
              {generatedPrompt}
            </div>

            {hasMissingValues && (
              <p className="mt-3 text-sm text-amber-400">
                Fill in all fields to complete your prompt.
              </p>
            )}
          </div>
          <div className="response-panel workspace-panel p-6">
            <h3 className="panel-title mb-3 text-lg font-semibold">
              3. AI Response
            </h3>

            {isGenerating && (
              <p className="text-sm text-indigo-400">
                Qwen is generating your response...
              </p>
            )}

            {aiError && (
              <p role="alert" className="text-sm text-red-400">
                {aiError}
              </p>
            )}

            {aiResponse && (
              <div className="response-content whitespace-pre-wrap break-words rounded-lg border p-4 text-sm leading-7">
                {aiResponse}
              </div>
            )}

            {!isGenerating && !aiResponse && !aiError && (
              <p className="response-placeholder text-sm">
                Your AI-generated response will appear here.
              </p>
            )}
          </div>
        </section>

        <footer className="app-footer mt-12 border-t pt-6 text-sm">
          Built to learn prompt engineering, one template at a time.
        </footer>
      </main>
    </div>
  );
}

export default App;
