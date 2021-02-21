import mockServer from "./mockServer";

const data = function () {
    return {
        name: 'Cron',
        data: {
            "server": mockServer()
        }
    }
}

export default data