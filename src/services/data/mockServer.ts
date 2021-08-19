import faker from 'faker';

import mockPlayer from './mockPlayer';

function mockServer() {
  return {
    createdAt: 1552652314131,
    updatedAt: 1552750573472,
    id: 1,
    name: faker.company.companyName(),
    ip: faker.internet.ip(),
    webPort: faker.datatype.number(),
    onlinePlayers: [...Array(faker.datatype.number({ max: 10, min: 1 }))].map(_ => mockPlayer()),
    stats: {
      gametime: {
        days: faker.datatype.number({ min: 1, max: 250 }),
        hours: faker.datatype.number({ min: 0, max: 24 }),
        minutes: faker.datatype.number({ min: 1, max: 60 })
      },
      players: faker.datatype.number({ min: 1, max: 20 }),
      hostiles: faker.datatype.number({ min: 1, max: 100 }),
      animals: faker.datatype.number({ min: 1, max: 100 })
    }

  };
}

export default mockServer;
