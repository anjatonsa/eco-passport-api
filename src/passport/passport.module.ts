import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportController } from './passport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Passport, PassportSchema } from 'src/schemas/passport.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Passport.name, schema: PassportSchema }]),],
  providers: [PassportService],
  controllers: [PassportController]
})
export class PassportModule {}
