import slugify from "slugify";

export class UpdatePost {

    constructor({ postRepository }) {
        this.postRepository = postRepository;
    }

    async execute({ id, title, content, status, userId, image, category }) {
        // Ambil data post yang sudah ada berdasarkan id
        const existingPost = await this.postRepository.getById(id);

        // Tentukan slug, jika title tidak diubah, gunakan slug lama
        let slug = existingPost.slug;

        // Jika title diubah, buat slug baru
        if (title && title !== existingPost.title) {
            slug = slugify(title, { lower: true, strict: true });
        }

        // Update post dengan data yang ada, termasuk status
        return await this.postRepository.update(id, { 
            title: title || existingPost.title, // Gunakan title lama jika tidak diubah
            slug,
            content,
            status, // Update status ke 'published' atau status lainnya
            user: userId,
            image,
            category
        });
    }
}
