import slugify from "slugify";

export class UpdatePost {
  constructor({ postRepository, s3Service }) {
    this.postRepository = postRepository;
    this.s3Service = s3Service;
  }

  async execute({ id, title, content, status, userId, image, category }) {
    const existingPost = await this.postRepository.getById(id);

    if (!existingPost) {
      throw new Error("Post not found.");
    }

    // Tentukan slug baru jika title diubah
    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      slug = slugify(title, { lower: true, strict: true });
    }

    // Cek dan upload image jika berupa file baru (bukan string URL)
    let imageUrl = existingPost.image;
    if (image && typeof image !== "string") {
      imageUrl = await this.s3Service.uploadImage(image);
    }

    return await this.postRepository.update(id, {
      title: title || existingPost.title,
      slug,
      content: content || existingPost.content,
      status: status || existingPost.status,
      user: userId || existingPost.user,
      image: imageUrl,
      category: category || existingPost.category,
    });
  }
}
