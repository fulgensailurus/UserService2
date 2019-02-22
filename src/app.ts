import 'reflect-metadata';
import fastify from 'fastify';

const app = fastify({
  logger: process.env.NODE_ENV !== 'test' || Boolean(process.env.FORCE_LOGGING),
});

export = app;
