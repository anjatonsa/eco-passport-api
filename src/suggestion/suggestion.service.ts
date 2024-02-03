import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Suggestion } from 'src/schemas/suggestion.schema';

@Injectable()
export class SuggestionService {
    constructor(@InjectModel(Suggestion.name) private suggestionModel: Model<Suggestion>) {}

}
