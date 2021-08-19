/* eslint-disable no-template-curly-in-string */
export const snippets: ISnippet[] = [
  {
    label: 'if',
    insertText: [
      '{{#if (${1:condition})}}',
      '\t$0',
      '{{/if}}`',
    ].join('\n'),
  }
];

interface ISnippet {
    label: string,
    insertText: string
}
