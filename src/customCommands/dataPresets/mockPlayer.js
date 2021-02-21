import faker from 'faker'

function mockPlayer() {
    return {
        "createdAt": 1552652314408,
        "updatedAt": 1552753112921,
        "id": 1,
        "steamId": "76561198028198341",
        "entityId": faker.random.number(),
        "ip": faker.internet.ip(),
        "country": faker.address.countryCode(),
        "currency": faker.random.number(),
        "avatarUrl": faker.internet.avatar(),
        "name": faker.internet.userName(),
        "positionX": faker.random.number(),
        "positionY": faker.random.number(),
        "positionZ": faker.random.number(),
        "inventory": null,
        "playtime": faker.random.number(),
        "lastOnline": faker.date.past(),
        "banned": faker.random.boolean(),
        "deaths": faker.random.number(),
        "zombieKills": faker.random.number(),
        "playerKills": faker.random.number(),
        "score": faker.random.number(),
        "level": faker.random.number(),
        "lastTeleportTime": faker.date.past(),
        "server": 1,
        "user": 1,
        "role": 1
    }
}


export default mockPlayer