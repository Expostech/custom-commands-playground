import playerData from '../customCommands/dataPresets/player'
import cronData from '../customCommands/dataPresets/cron'
import hookData from "../customCommands/dataPresets/hook"
import { Store } from './editor'


const Examples = () => {

    const handleClick = (e) => {
        const ex = examples.find(_ => _.name === e.target.textContent)
        Store.data = ex.dataSet().data
        Store.input = ex.input
    }

    const rendered = examples.map(_ => (
        <li className="cursor-pointer" onClick={handleClick}>{_.name}</li>
    ))

    return (
        <ul>
            {rendered}
        </ul>
    )
}

export default Examples


const examples = [{
    name: 'Loops',
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
    input: `
    {{#if (gt player.level 100)}}
        multipleentityspawn {{player.steamId}} 4 @ 70 61 60 59
    {{else}}
        pm {{player.steamId}} "Sorry, you must be at least level 100 for this command"
    {{/if}}
    `,
    dataSet: hookData
}]

