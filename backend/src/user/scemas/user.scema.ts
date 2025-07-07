/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true, default: 'citizen', enum: ['admin', 'citizen', 'writer'] })
    role: string;
    @Prop({ required: true, default: Date.now() })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
