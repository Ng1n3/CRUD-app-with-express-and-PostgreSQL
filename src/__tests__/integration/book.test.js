const Book = require('../../models/book.model');
const { createTestClient } = require('../setup.helper.js');

describe('Book API Endpoints', () => {
  let testClient;
  let bookId;

  beforeEach(async () => {
    testClient = createTestClient();
    await Book.destroy({ where: {}, force: true });
    const book = await Book.create({
      title: 'JavaScript: The Definitive Guides',
      description:
        'For web developers and other programmers interested in using JavaScript, this bestselling book provides the most comprehensive JavaScript material on the market.',
      price: 4900,
      year: 2020,
      isbn: '1491951982',
      pageCount: 706,
      tag: ['Programming', 'JavaScript'],
      authorName: ['David Flanagan'],
    });
    bookId = book.id;
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

  it('should get the list of all books', async () => {
    const res = await testClient.get('/api/v1/books');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty('title');
  });

  it('Should update the title of book', async () => {
    const updatedTitle = 'JavaScript: The Definitive Guide';
    const res = await testClient
      .put(`/api/v1/books/${bookId}`)
      .send({ title: updatedTitle });

    console.log("respond", res.body);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.data).toHaveProperty('title', updatedTitle);
    expect(res.body.data).toHaveProperty('description');
    expect(res.body.data).toHaveProperty('price');
    expect(res.body.data).toHaveProperty('year');
  });

  it('Get a note by note Id', async () => {
    const res = await testClient.get(`/api/v1/books/${bookId}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data).toHaveProperty('id', bookId);
    expect(res.body.data).toHaveProperty('year');
  });

  it('Delete a note by Id', async () => {
    const res = await testClient.delete(`/api/v1/books/${bookId}`);

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
    // expect(res.body.status).toBe('OK')
  });
});
