import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/entities/user.dto';
import { User } from 'src/schemas/user.schema';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }
    @Post()
    create(@Body() user: UserDto): Promise<User> {
        try {
            const createdUser = this.userService.create(user);
            return createdUser;
        }
        catch (error) {
            console.error('Error creating an user:', error);
            throw new InternalServerErrorException('Error creating an user.');
        }
    }

    @Put(':email')
    update(@Param('email') email: string, @Body() user: UserDto): Promise<User> {
        try {
            const updatedUser = this.userService.update(email, user);
            return updatedUser;
        }
        catch (error) {
            console.error('Error updating an user:', error);
            throw new InternalServerErrorException('Error updating an user.');
        }
    }

    @Delete(':email')
    delete(@Param('email') email: string): Promise<void> {
        try {
            this.userService.delete(email);
            return null;
        }
        catch (error) {
            console.error('Error deleting an user:', error);
            throw new InternalServerErrorException('Error deleting an user.');
        }
    }

    @Post('/signIn')
    signIn(@Body() user: any): Promise<User | null> {
        try {
            const signedInUser = this.userService.signIn(user.email, user.password);
            return signedInUser;
        } catch (error) {
            console.error('Error signing in:', error);
            throw new InternalServerErrorException('Error signing in.');
        }
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        try {
            const allUsers = this.userService.findAllUsers();
            return allUsers;
        }
        catch (error) {
            console.error('Error returning all users:', error);
            throw new InternalServerErrorException('Error returning all users.');
        }
    }

    @Get(':email')
    getByEmail(@Param('email') email: string): Promise<User> {
        try {
            const user = this.userService.getByEmail(email);
            return user;
        }
        catch (error) {
            console.error('Error fetching an user:', error);
            throw new InternalServerErrorException('Error fetching an user.');
        }
    }

}
