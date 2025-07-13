export class Post {
    constructor({ id, title, slug, image, content, status, user, category}) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.image  = image;
        this.content = content;
        this.status = status;
        this.user = user;
        this.category = category;
    }
}