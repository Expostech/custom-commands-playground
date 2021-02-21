import faker from 'faker'
import mockPlayer from './mockPlayer'
import mockServer from './mockServer'

const data = function () {
    return {
        name: 'Custom command',
        data: {
            date: "2019-03-16",
            time: "16:18:46",
            uptime: "612525.066",
            msg: "Executing command 'w2l testing' by Telnet from 127.0.0.1:37284",
            type: "Log",
            player: mockPlayer(),
            server: mockServer()
        }
    }
}

export default data 