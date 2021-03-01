import { store } from '@risingstack/react-easy-state';
import playerData from '../../customCommands/dataPresets/player'
import cronData from '../../customCommands/dataPresets/cron'
import hookData from "../../customCommands/dataPresets/hook"

export const Store = store({
  input: `
  pm {{player.steamId}} "Hey {{player.name}} hows it going?";
  pm {{player.steamId}} "These high-level players are also online:
    {{#each server.onlinePlayers}}
      {{#if (gt this.level 100)}}
        {{this.name}}
      {{/if}}
    {{/each}}"
    `,
  dataTemplates: [playerData, cronData, hookData],
  data: null
});
