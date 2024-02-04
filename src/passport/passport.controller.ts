import { Body, Get, Delete, Controller,InternalServerErrorException,Param,Post, Put } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportDto } from 'src/entities/passport.dto';
import { Passport } from 'src/schemas/passport.schema';

@Controller('passport')
export class PassportController {
    constructor(private passportService:PassportService){}
    
    @Post(':email')
    create(@Body() passport: PassportDto, @Param('email')email: string ):Promise<Passport> {
        try{
            const createdPassport = this.passportService.create(passport,email);
            return createdPassport;
        }
        catch(error)
        {
            console.error('Error creating a passport:', error);
            throw new InternalServerErrorException('Error creating a passport.');
        } 
    }

    @Put(':id')
    update(@Param('id')id: string, @Body() passport: PassportDto):Promise<Passport> {
        try{
            const updatedPassport = this.passportService.update(id, passport);
            return updatedPassport;
        }
        catch(error)
        {
            console.error('Error updating a passport:', error);
            throw new InternalServerErrorException('Error updating a passport.');
        }
    }

    @Delete(':id')
    delete(@Param('id')id: string):Promise<void> {
        try{
            this.passportService.delete(id);
            return null;
        }
        catch(error)
        {
            console.error('Error deleting a passport:', error);
            throw new InternalServerErrorException('Error deleting a passport.');
        }
    }

    @Get('/id/:id')
    getById(@Param('id')id: string):Promise<Passport> {
        try{
            const passport = this.passportService.getById(id);
            return passport;
        }
        catch(error)
        {
            console.error('Error fetching a passport:', error);
            throw new InternalServerErrorException('Error fetching a passport.');
        }
    }

    @Get('/owner/:email')
    getAllFromUser(@Param('email')email: string):Promise<Passport[]> {
        try{
            const passports = this.passportService.getAllFromUser(email);
            return passports;
        }
        catch(error)
        {
            console.error('Error fetching all passports from user:', error);
            throw new InternalServerErrorException('Error fetching all passports from user.');
        }
    }

    @Get('/search')
    getByParametars(@Body() params: any):Promise<Passport[]> {
        try{
            const passports = this.passportService.searchPassports(params);
            return passports;
        }
        catch(error)
        {
            console.error('Error fetching a passport:', error);
            throw new InternalServerErrorException('Error fetching a passport.');
        }
    }

}
