/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './scemas/user.scema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}

    create(dto: CreateUserDto) {
        return this.userModel.create(dto);
    }

    findAll() {
        return this.userModel.find().exec();
    }

    findOne(id: string) {
        return this.userModel.findById(id).exec();
    }

    update(id: string, dto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    remove(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}