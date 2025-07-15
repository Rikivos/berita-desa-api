export class GetAllUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ page, limit }) {
    return await this.userRepository.findAll({ page, limit });
  }
}
