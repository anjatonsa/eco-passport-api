import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDto } from 'src/entities/user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(user: UserDto) {
    const newuser = new this.userModel({ ...user });
    return newuser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(email: string, updateUserDto: any): Promise<User> {
    const existingUser = await this.userModel.findOne({ email }).exec();

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    existingUser.name = updateUserDto.name || existingUser.name;
    existingUser.surname = updateUserDto.surname || existingUser.surname;
    existingUser.phoneNumber = updateUserDto.phoneNumber || existingUser.phoneNumber;

    const updatedUser = await existingUser.save();

    return updatedUser;
  }

  async getByEmail(email: string): Promise<null | User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('User with this email not found.');
    }
    return user;
  }

  async signIn(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async delete(email: any): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('User with this email not found.');
    }
    await this.userModel.findByIdAndDelete(user.id).exec();
    return null;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
