import faker from 'faker'
import mockPlayer from './mockPlayer'

function mockServer() {
    return {
        createdAt: 1552652314131,
        updatedAt: 1552750573472,
        id: 1,
        name: faker.company.companyName(),
        ip: faker.internet.ip(),
        webPort: faker.random.number(),
        onlinePlayers: [...Array(faker.random.number({ max: 10, min: 1 }))].map(_ => mockPlayer())
    }
}


export default mockServer