const Book = require('../../models/book.model');
const { createTestClient } = require('../setup.helper.js');

describe('Book API Endpoints', () => {
  let testClient;

  beforeEach(async () => {
    testClient = createTestClient();
    await Book.destroy({ where: {}, force: true });
  });

  it('should create a new book', async () => {
    const bookData = {
      title: 'JavaScript and Jquery',
      description:
        "JavaScript was written to give readers an accurate, concise examination of JavaScript objects and their supporting nuances, such as complex values, primitive values, scope, inheritance, the head object, and more. If you're an intermediate JavaScript developer and want to solidify your understanding of the language, or if you've only used JavaScript beneath the mantle of libraries such as jQuery or Prototype, this is the book for you.",
      price: 11000,
      year: 2017,
      isbn: '1548955469',
      pageCount: 204,
      tag: ['programming', 'JavaScript'],
      authorName: ['Jon Duckett'],
    };
    const res = await testClient.post('/api/v1/books').send(bookData);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('OK');
    expect(res.body.data.title).toBe(bookData.title);
  });
});