import * as monaco from 'monaco-editor';

import { CUSTOM_LANGUAGE, SNIPPETS } from '../constants';
import customCommands from '../constants/commands.json';
import { helpers } from '../constants/helpers.json';

export function setup() {
  // Constructor for new language
  monaco.languages.register({ id: CUSTOM_LANGUAGE });

  // SUGGESTIONS OF POSSIBLE COMMANDS
  monaco.languages.registerCompletionItemProvider(CUSTOM_LANGUAGE, {
    provideCompletionItems: (
      model: monaco.editor.ITextModel,
      position: monaco.Position,
      context: monaco.languages.CompletionContext,
      token: monaco.CancellationToken
    ) => {
      const range: monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: model.getWordUntilPosition(position).startColumn,
        endColumn: model.getWordUntilPosition(position).endColumn,
      };

      const helperCompletions: monaco.languages.CompletionItem[] =
        helpers.map((helper) => {
          const insertText = `${helper.name} ${helper.parameters.join(' ')}`;

          return {
            label: helper.name,
            kind: monaco.languages.CompletionItemKind.Method,
            documentation: `Handlebars helper: ${helper.name}`,
            detail: `Handlebars helper: ${helper.name}`,
            insertText,
            range: range,
          };
        });

      const commandCompletions: monaco.languages.CompletionItem[] =
        customCommands.map((cmd) => ({
          label: cmd.command,
          kind: monaco.languages.CompletionItemKind.Method,
          documentation: `7D2D command: ${cmd.help}`,
          detail: `7D2D command: ${cmd.description}`,
          insertText: cmd.command,
          range: range,
        }));

      const snippets: monaco.languages.CompletionItem[] = SNIPPETS.map(
        (snippet) => ({
          label: snippet.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        })
      );

      const suggestions: monaco.languages.CompletionItem[] =
        snippets.concat(commandCompletions).concat(helperCompletions);
      return { suggestions: suggestions };
    },
  });
}

export const editorOptions = (init: string, extraOptions = {}) => {
  return {
    value: init,
    language: CUSTOM_LANGUAGE,
    theme: 'vs-dark',
    padding: { top: 10 },
    automaticLayout: true,
    ...extraOptions,
  };
};
