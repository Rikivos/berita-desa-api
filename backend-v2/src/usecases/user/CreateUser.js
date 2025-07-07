export const CreateUser = (userRepository) => async ({ name, email, password }) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error('Email already registered');
  const user = await userRepository.create({ name, email, password });
  return { id: user._id, email: user.email };
};
