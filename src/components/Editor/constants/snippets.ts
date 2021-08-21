/* eslint-disable no-template-curly-in-string */
export const snippets: ISnippet[] = [
  {
    label: 'if',
    insertText: [
      '{{#if (${1:condition})}}',
      '\t$0',
      '{{/if}}`',
    ].join('\n'),
  },
  {
    label: 'ifelse',
    insertText: [
      '{{#if (${1:conditionOne})}}',
      '\t$0',
      '{{else if (${2:conditionTwo})}}',
      '\telseif',
      '{{else}}',
      '\tfinal case',
      '{{/if}}',
    ].join('\n'),
  },
  {
    label: 'each',
    insertText: [
      '{{#each server.onlinePlayers}}',
      '\t$0',
      '{{/each}}'
    ].join('\n'),
  },
];

interface ISnippet {
    label: string,
    insertText: string
}
