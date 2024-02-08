import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SuggestionDto } from 'src/entities/suggestion.dto';
import { PassportService } from 'src/passport/passport.service';
import { Suggestion } from 'src/schemas/suggestion.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SuggestionService {
  constructor(@InjectModel(Suggestion.name) private suggestionModel: Model<Suggestion>,
    private userService: UserService, private passportService: PassportService) { }

  async create(suggestionDto: SuggestionDto): Promise<Suggestion> {
    const createdSuggestion = new this.suggestionModel({ ...suggestionDto });
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

  async getForNextEnergyClass(passportId: string): Promise<Suggestion | null> {

    const passport = await this.passportService.getById(passportId);

    const currentEnergyClass = passport.energyClass;
    const energyClass = currentEnergyClass !== "A" ? String.fromCharCode(currentEnergyClass.charCodeAt(0) - 1) : currentEnergyClass;
    const suggestion = await this.suggestionModel.findOne({ energyClass }).exec();

    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }

    const newSuggestion: Suggestion = {
      energyClass: suggestion.energyClass,
      energySources: suggestion.energySources,
      heatingType: suggestion.heatingType,
      ventilation: suggestion.ventilation,
      hotWater: suggestion.hotWater,
      coolingType: suggestion.coolingType
    }

    for (const key in newSuggestion) {
      if (Array.isArray(newSuggestion[key])) {
        const newArray = [];
        for (const item of newSuggestion[key]) {
          if (!passport[key].includes(item)) {
            newArray.push(item);
          }
        }
        newSuggestion[key] = newArray;
      } else {
        if (passport[key] === newSuggestion[key]) {
          newSuggestion[key] = "";
        }
      }
    }
    return newSuggestion;
  }
}
