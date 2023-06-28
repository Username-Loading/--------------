import faker from 'faker';

export function bookListFactory(n = 20) {
  return [...new Array(n)].map(bookFactory);
}

export function dataForBookFromForm() {
  return {
    _id: faker.datatype.uuid(),
    authorId: faker.datatype.uuid(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
  };
}

export function bookFactory() {
  return {
    name: faker.lorem.words(),
    img:
      'https://st2.depositphotos.com/1105977/5461/i/600/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg',
    genre: faker.lorem.words(),
    otherAuthors: [...new Array(faker.datatype.number({ min: 1, max: 3 }))].map(faker.lorem.words),
    pagesQuantity: faker.datatype.number({ min: 80, max: 1200 }),
    isPaid: faker.datatype.boolean(),
    price: faker.datatype.number({ min: 60, max: 1000 }),
    description: faker.lorem.paragraph(),
    bookURL: 'https://www.google.com.ua',
    isPrivate: false,
  };
}
