import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from './passport/passport.module';
import { UserModule } from './user/user.module';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/db'), UserModule, PassportModule, SuggestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
