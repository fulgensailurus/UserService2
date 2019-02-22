import 'reflect-metadata';
import fastify from 'fastify';
import users from './routes/users';

const app = fastify({
  logger: process.env.NODE_ENV !== 'test' || Boolean(process.env.FORCE_LOGGING),
});

app.register(users, { prefix: '/users' });

export = app;
