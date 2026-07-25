import bcrypt from 'bcrypt';
import prisma from '../utils/prisma.js';
import { generateToken } from '../utils/jwt.js';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    token: generateToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};