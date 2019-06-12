import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import 'reflect-metadata';
import users from './routes/users';

const app = fastify({
  logger: process.env.NODE_ENV !== 'test' || Boolean(process.env.FORCE_LOGGING),
});

app.register(fastifyCors);
app.register(users, { prefix: '/users' });

export = app;
