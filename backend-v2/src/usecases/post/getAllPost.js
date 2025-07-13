export class GetAllPost {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute() {
        return this.postRepository.getAll();
    }
}