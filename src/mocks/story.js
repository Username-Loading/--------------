import faker from 'faker';

export function storyListFactory(n = 20) {
  return [...new Array(n)].map(storyFactory);
}

export function dataForStoryFromForm() {
  return {
    _id: faker.datatype.uuid(),
    authorId: faker.datatype.uuid(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
  };
}

export function storyFactory() {
  return {
    name: faker.lorem.words(),
    genre: faker.lorem.words(),
    shortDescription: faker.lorem.paragraph(),
    story: faker.lorem.paragraphs(),
    isPrivate: false,
  };
}
