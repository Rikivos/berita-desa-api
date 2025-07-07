/* eslint-disable prettier/prettier */
// modules/user/dto/create-user.dto.ts
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role?: string;
}
