import type { Request, Response } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../services/auth.service.js';

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await registerUser(req.body);

     res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Something went wrong',
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Something went wrong',
    });
  }
};

export const me = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const user = await getCurrentUser(req.user!.id);

    res.json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};