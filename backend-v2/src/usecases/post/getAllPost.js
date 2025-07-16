export class GetAllPost {
    constructor(postRepository) {
      this.postRepository = postRepository;
    }
  
    async execute(params) {
      return this.postRepository.getAll(params);
    }
  }
  