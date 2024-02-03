import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Suggestion, SuggestionSchema } from 'src/schemas/suggestion.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Suggestion.name, schema: SuggestionSchema }]),],
  controllers: [SuggestionController],
  providers: [SuggestionService]
})
export class SuggestionModule {}
