import hookData from '../customCommands/dataPresets/hook';
import playerData from '../customCommands/dataPresets/player';
import { Store } from './editor';


const Examples = () => {

    const handleClick = (e) => {
        e.stopPropagation();
        const ex = examples.find(_ => _.name === e.target.textContent)
        Store.data = ex.dataSet().data
        Store.input = ex.input
    }

    const rendered = examples.map(_ => (
        <div>
            <h2 onClick={handleClick} className="cursor-pointer underline">{_.name}</h2>
            <small>{_.description}</small>
        </div>
    ))

    return rendered
}

export default Examples


const examples = [
    {
        name: 'Loops',
        description: 'Do something for all online players',
        input: `
    pm {{player.steamId}} "These players are online:
    {{#each server.onlinePlayers}}
        {{this.name}} {{this.level}},
    {{/each}}"
    `,
        dataSet: playerData
    },
    {
        name: 'Conditional statement',
        description: 'Execute a command only if player is above a certain ingame level',
        input: `
    {{#if (gt player.level 100)}}
        multipleentityspawn {{player.steamId}} 4 @ 70 61 60 59
    {{else}}
        pm {{player.steamId}} "Sorry, you must be at least level 100 for this command"
    {{/if}}
    `,
        dataSet: hookData
    },
    {
        name: 'Starter kit',
        description: 'Give a player some starting items. Optionally you can add a conditional statement here',
        input: `
        pm {{player.steamId}} "Hey {{player.name}}, You are about to receive your starter items.";
        wait(5);
        giveplus {{player.entityId}} gunBowT0PrimitiveBow 1 2 0;
        giveplus {{player.entityId}} ammoArrowStone 30;
        giveplus {{player.entityId}} drinkJarGoldenRodTea 2;
        giveplus {{player.entityId}} foodBaconAndEggs 2;
        giveplus {{player.entityId}} meleeToolAxeT1IronFireaxe 1 2 0;
        wait(5);
        pm {{player.steamId}} "Please {{player.name}}, Stay safe out there survivor.";
    `,
        dataSet: hookData
    },
    {
        name: 'Conditional based on CSMM role',
        description: 'Only do something if a player has a high enough role on CSMM. Useful for limiting actions to mods/admins',
        input: `
        {{#if (gt player.role.level 10 )}} 
            pm {{player.steamId}} "Hey {{player.name}} You have the correct role to execute this command";
        {{else}} 
            pm {{player.steamId}} "Sorry, {{player.name}}, you're not allowed to do that";
        {{/if}}
    `,
        dataSet: playerData
    },
    {
        name: 'Scoreboard of top players',
        description: 'Shows a top 5 of online players sorted by their zombie kills',
        input: `
        say "Top 5 players online by Kills:";
        {{!-- Sort the array of online players --}}
        {{#each (sort server.onlinePlayers "zombieKills" "desc")}}
        {{!-- @index is how many iterations we have done, so for a top 5 we only print when @index is smaller than 5 --}}
            {{#if (lt @index 5)}}
                say "{{this.name}} {{this.zombieKills}} Kills, {{this.deaths}} Deaths";
                say "KLR = {{round ( divide this.zombieKills (sum this.deaths 1)) 1}}";
            {{/if}}
        {{/each}}
    `,
        dataSet: playerData
    },
]


