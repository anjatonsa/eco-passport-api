import { Body, Get, Delete, Controller, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { SuggestionDto } from 'src/entities/suggestion.dto';
import { Suggestion } from 'src/schemas/suggestion.schema';

@Controller('suggestion')
export class SuggestionController {

    constructor(private suggestionService: SuggestionService) { }


    @Post()
    create(@Body() suggestion: SuggestionDto): Promise<Suggestion> {
        try {
            const createdSuggestion = this.suggestionService.create(suggestion);
            return createdSuggestion;
        }
        catch (error) {
            console.error('Error creating a suggestion:', error);
            throw new InternalServerErrorException('Error creating a suggestion.');
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() suggestion: SuggestionDto): Promise<Suggestion> {
        try {
            const updatedSuggestion = this.suggestionService.update(id, suggestion);
            return updatedSuggestion;
        }
        catch (error) {
            console.error('Error updating a suggestion:', error);
            throw new InternalServerErrorException('Error updating a suggestion.');
        }
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        try {
            this.suggestionService.delete(id);
            return null;
        }
        catch (error) {
            console.error('Error deleting a suggestion:', error);
            throw new InternalServerErrorException('Error deleting a suggestion.');
        }
    }

    @Get('/id/:id')
    getById(@Param('id') id: string): Promise<Suggestion> {
        try {
            const passport = this.suggestionService.getById(id);
            return passport;
        }
        catch (error) {
            console.error('Error fetching a suggestion:', error);
            throw new InternalServerErrorException('Error fetching a suggestion.');
        }
    }
    
    @Get('/upgrade/:passportId')
    getForNextEnergyClass(@Param('passportId') passportId: string): Promise<Suggestion> {
        try {
            const passport = this.suggestionService.getForNextEnergyClass(passportId);
            return passport;
        }
        catch (error) {
            console.error('Error fetching a suggestion:', error);
            throw new InternalServerErrorException('Error fetching a suggestion.');
        }
    }
}
