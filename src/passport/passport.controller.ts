import { Body, Get, Delete, Controller, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportDto } from 'src/entities/passport.dto';
import { Passport } from 'src/schemas/passport.schema';

@Controller('passport')
export class PassportController {
    constructor(private passportService: PassportService) { }

    @Post(':email')
    async create(@Body() passport: PassportDto, @Param('email') email: string): Promise<Passport> {
        try {
            const createdPassport = await this.passportService.create(passport, email);
            return createdPassport;
        }
        catch (error) {
            console.error('Error creating a passport:', error);
            throw new InternalServerErrorException('Error creating a passport.');
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() passport: PassportDto): Promise<Passport> {
        try {
            const updatedPassport = await this.passportService.update(id, passport);
            return updatedPassport;
        }
        catch (error) {
            console.error('Error updating a passport:', error);
            throw new InternalServerErrorException('Error updating a passport.');
        }
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        try {
            this.passportService.delete(id);
            return null;
        }
        catch (error) {
            console.error('Error deleting a passport:', error);
            throw new InternalServerErrorException('Error deleting a passport.');
        }
    }

    @Get('/id/:id')
    async getById(@Param('id') id: string): Promise<Passport> {
        try {
            const passport = await this.passportService.getById(id);
            return passport;
        }
        catch (error) {
            console.error('Error fetching a passport:', error);
            throw new InternalServerErrorException('Error fetching a passport.');
        }
    }

    @Get('/owner/:email')
    async getAllFromUser(@Param('email') email: string): Promise<Passport[]> {
        try {
            const passports = await this.passportService.getAllFromUser(email);
            return passports;
        }
        catch (error) {
            console.error('Error fetching all passports from user:', error);
            throw new InternalServerErrorException('Error fetching all passports from user.');
        }
    }

    @Get('/search')
    async getByParametars(@Query() params: any): Promise<Passport[]> {
        try {
            const passports = await this.passportService.searchPassports(params);
            return passports;
        }
        catch (error) {
            console.error('Error fetching  passports:', error);
            throw new InternalServerErrorException('Error fetching  passports.');
        }
    }
    
    @Get('/citystatistic/:city')
    async getCityStatistic(@Param('city') city: string): Promise<any> {
        try {
            const statistic = await this.passportService.getCitySatistic(city);
            return statistic;
        }
        catch (error) {
            console.error('Error fetching city statistic:', error);
            return [];
        }
    }

}
