import { User } from '../entities/User';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import httpStatus from 'http-status';

const getUsers = async (_: any, reply: FastifyReply<ServerResponse>) => {
  const users = await User.find();
  reply.send(users);
};

const getUser = async (request: any, reply: FastifyReply<ServerResponse>) => {
  const user = await User.findOne(request.params.id);
  if (!user) {
    return reply.code(httpStatus.NOT_FOUND).send();
  }

  reply.send(user);
};

const createUser = async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
  const user = User.create(request.body);
  try {
    await user.save();
    reply
      .code(httpStatus.CREATED)
      .send(user);
  } catch (err) {
    reply
      .code(httpStatus.BAD_REQUEST)
      .send({ error: 'boohoo!' });
  }
};

const editUser = async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
  const user = await User.findOne(request.params.id);
  if (!user) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  User.merge(user, request.body);
  await user.save();
  reply
    .code(httpStatus.OK)
    .send(user);
};

const deleteUser = async (request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
  const user = await User.findOne(request.params.id);
  if (!user) {
    return reply
      .code(httpStatus.NOT_FOUND)
      .send();
  }

  await User.delete(user);
  reply
    .code(httpStatus.OK)
    .send(user);
};

export = function (fastify: FastifyInstance, _: any, next: any) {
  fastify.get('/', getUsers);
  fastify.get('/:id', getUser);
  fastify.post('/', createUser);
  fastify.put('/:id', editUser);
  fastify.delete('/:id', deleteUser);

  next();
};
