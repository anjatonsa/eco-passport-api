import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Suggestion, SuggestionSchema } from 'src/schemas/suggestion.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Suggestion.name, schema: SuggestionSchema }]), UserModule],
  controllers: [SuggestionController],
  providers: [SuggestionService]
})
export class SuggestionModule {}
