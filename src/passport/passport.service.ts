import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passport } from 'src/schemas/passport.schema';

@Injectable()
export class PassportService {

    constructor(@InjectModel(Passport.name) private passportModel: Model<Passport>) {}
}
