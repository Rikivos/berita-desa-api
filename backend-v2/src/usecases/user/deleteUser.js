export class DeleteUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async handle(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.userRepository.delete(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}