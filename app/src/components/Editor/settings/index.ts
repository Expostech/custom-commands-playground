import * as monaco from 'monaco-editor';

import { CUSTOM_LANGUAGE, SNIPPETS } from '../constants';
import customCommands from '../constants/commands.json';

export function setup() {
  // Constructor for new language
  monaco.languages.register({ id: CUSTOM_LANGUAGE });

  // SUGGESTIONS OF POSSIBLE COMMANDS
  monaco.languages.registerCompletionItemProvider(CUSTOM_LANGUAGE, {
    provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: monaco.CancellationToken) => {
      const range: monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: model.getWordUntilPosition(position).startColumn,
        endColumn: model.getWordUntilPosition(position).endColumn
      };

      const commandCompletions: monaco.languages.CompletionItem[] = customCommands.map((cmd) => ({
        label: cmd.command,
        kind: monaco.languages.CompletionItemKind.Method,
        documentation: cmd.help,
        detail: cmd.description,
        insertText: cmd.command,
        range: range,
      }));

      const snippets: monaco.languages.CompletionItem[] = SNIPPETS.map(snippet => ({
        label: snippet.label,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: snippet.insertText,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      }));

      const suggestions: monaco.languages.CompletionItem[] = snippets.concat(commandCompletions);
      return { suggestions: suggestions };
    }
  });
}

export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  value: ['val here'].join('\n'),
  language: CUSTOM_LANGUAGE,
  theme: 'vs-dark'
};
