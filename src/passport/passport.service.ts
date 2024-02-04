import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassportDto } from 'src/entities/passport.dto';
import { Passport } from 'src/schemas/passport.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PassportService {

    constructor(@InjectModel(Passport.name) private passportModel: Model<Passport>, private userService:UserService) {}

    async create(passportDto: PassportDto, email:string): Promise<Passport> {

        const userId = await this.userService.findByEmail(email);
        const createdPassport = new this.passportModel({...passportDto, owner:userId});
        return createdPassport.save();
      }
    
      async update(id: string, passportDto: PassportDto): Promise<Passport> {
        const updatedPassport = await this.passportModel.findByIdAndUpdate(id, passportDto, { new: true });
        
        if (!updatedPassport) {
          throw new NotFoundException('Passport not found');
        }
    
        return updatedPassport;
      }
    
      async delete(id: string): Promise<void> {
        const deletedPassport = await this.passportModel.findByIdAndDelete(id);
    
        if (!deletedPassport) {
          throw new NotFoundException('Passport not found');
        }
      }
    
      async getById(id: string): Promise<Passport> {
        const passport = await this.passportModel.findById(id).exec();
    
        if (!passport) {
          throw new NotFoundException('Passport not found');
        }
    
        return passport;
      }
    
      async getAllFromUser(email: string): Promise<Passport[]> {
        const userId = await this.userService.findByEmail(email);
        if(!userId)
        {
          throw new NotFoundException('User not found')
        }
        const passports = await this.passportModel.find({ owner:userId }).exec();

        return passports;
      }

      async searchPassports(userSearchParameters: any): Promise<Passport[]> {

        /*userSearchParameters={
          "citys":"Example City",
          "buildingCategory":"zgrada"
        }*/
        const searchConditions: any = {};

        for (const key in userSearchParameters) {
          if (userSearchParameters.hasOwnProperty(key)) {
            searchConditions[key] = userSearchParameters[key];
          }
        }
    
        const passports = await this.passportModel.find(searchConditions).exec();
        return passports;
      }
    
}
