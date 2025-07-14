export class DeleteCategory {
    constructor({ categoryRepository, postRepository }) {
      this.categoryRepository = categoryRepository;
      this.postRepository = postRepository;
    }
  
    async handle(req, res, next) {
      try {
        const { id } = req.params;
  
        // Cek apakah ada post yang pakai kategori ini
        const postsUsingCategory = await this.postRepository.countByCategoryId(id);
        if (postsUsingCategory > 0) {
          return res.status(400).json({ message: 'Cannot delete category because it is in use by one or more posts.' });
        }
  
        // Lanjut delete
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
  