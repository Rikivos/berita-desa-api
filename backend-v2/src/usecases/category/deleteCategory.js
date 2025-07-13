export class DeleteCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async handle(req, res, next) {
        try {
            const { id } = req.params;

            const result = await this.categoryRepository.delete(id);

            if (!result) {
                return res.status(404).json({ message: 'Category not found.' });
            }

            return res.status(200).json({ message: 'Category deleted successfully.' });
        } catch (err) {
            next(err);
        }
    }
}
