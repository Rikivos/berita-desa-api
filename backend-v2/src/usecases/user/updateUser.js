export class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(currentUser, targetUserId, updateData) {
    // Role check: admin bisa update siapa pun, user hanya bisa update dirinya sendiri
    if (currentUser.role !== 'admin' && currentUser.id !== targetUserId) {
      throw new Error("You don't have permission to update this user.");
    }

    // Optional: Batasi field yang bisa diubah jika perlu
    const { role, password, ...safeData } = updateData;
    
    // Jangan izinkan user biasa mengubah role atau password langsung (bisa dibuat endpoint terpisah)
    if (currentUser.role !== 'admin' && (role )) {
      throw new Error("You can't change role .");
    }

    return await this.userRepository.update(targetUserId, currentUser.role === 'admin' ? updateData : safeData);
  }
}
