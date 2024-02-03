import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuggestionDto } from 'src/entities/suggestion.dto';
import { Suggestion } from 'src/schemas/suggestion.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SuggestionService {
    constructor(@InjectModel(Suggestion.name) private suggestionModel: Model<Suggestion>,
    private userService:UserService) {}

    async create(suggestionDto: SuggestionDto): Promise<Suggestion> {
        const createdSuggestion = new this.suggestionModel({...suggestionDto});
        return createdSuggestion.save();
      }
    
      async update(id: string, suggestionDto: SuggestionDto): Promise<Suggestion> {
        const updatedSuggestion = await this.suggestionModel.findByIdAndUpdate(id, suggestionDto, { new: true });
    
        if (!updatedSuggestion) {
          throw new NotFoundException('Suggestion not found');
        }
    
        return updatedSuggestion;
      }
    
      async delete(id: string): Promise<void> {
        const deletedSuggestion = await this.suggestionModel.findByIdAndDelete(id);
    
        if (!deletedSuggestion) {
          throw new NotFoundException('Suggestion not found');
        }
      }
    
      async getById(id: string): Promise<Suggestion | null> {
        const suggestion = await this.suggestionModel.findById(id).exec();
    
        if (!suggestion) {
          throw new NotFoundException('Suggestion not found');
        }
    
        return suggestion;
      }
    
      async getByEnergyClass(energyClass: string): Promise<Suggestion | null> {
        const suggestion = await this.suggestionModel.findOne({ energyClass }).exec();
    
        if (!suggestion) {
          throw new NotFoundException('Suggestion not found');
        }
    
        return suggestion;
      }
}
