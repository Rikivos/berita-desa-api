import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const RegisterUser = (userRepository) => async ({ name, email, password, role = 'user' }) => {
  // Validasi input dasar
  if (!email || !password || !name) {
    throw new Error('Name, email, and password are required');
  }

  // Cek apakah user sudah terdaftar
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  // Buat JWT token
  const payload = {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

  return {
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  };
};
