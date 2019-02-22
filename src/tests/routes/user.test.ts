import dotenv from 'dotenv';

import { createConnection, Connection } from 'typeorm';
import app from '../../app';
import supertest from 'supertest';
import httpStatus from 'http-status';

beforeAll(() => {
  dotenv.config({ path: '.env.test' });
});

describe('user routes', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await app.ready();
  });

  afterAll(async () => {
    await connection.close();
    await app.close(() => {});
  });

  describe('GET users', () => {
    it('Should return a list of users', async () => {
      const { body } = await supertest(app.server)
        .get('/users')
        .expect(httpStatus.OK);

      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(0);
    });

    it('Should return 1 user after insertion', async () => {
      await supertest(app.server)
        .post('/users')
        .send({ firstName: 'John', lastName: 'Doe' })
        .expect(httpStatus.CREATED);

      const { body } = await supertest(app.server)
        .get('/users')
        .expect(httpStatus.OK);

      expect(body).toHaveLength(1);
      expect(body[0]).toMatchObject({id: expect.any(String), firstName: 'John', lastName: 'Doe' });
    });
  });
});
