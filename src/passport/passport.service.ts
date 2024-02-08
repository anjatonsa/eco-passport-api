import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassportWithOwner } from 'src/entities/passport-with-owner.dto';
import { PassportDto } from 'src/entities/passport.dto';
import { Passport } from 'src/schemas/passport.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PassportService {

    constructor(@InjectModel(Passport.name) private passportModel: Model<Passport>, private userService:UserService) {}

    async create(passportDto: PassportDto, email:string): Promise<Passport> {

        const user = await this.userService.getByEmail(email);
        const createdPassport = new this.passportModel({...passportDto, owner:user._id});
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
    
      async getAllFromUser(email: string): Promise<PassportWithOwner[]> {
        const user = await this.userService.getByEmail(email);
        const usersId=user._id;
        if(!user)
        {
          throw new NotFoundException('User not found')
        }
        const passports = await this.passportModel.find({ owner:usersId }).exec();
        const passportsWithOwner=[];
        await Promise.all(
          passports.map(async passport => {
            const updatedPassport = { ...passport.toObject(), owner: user };
            passportsWithOwner.push(updatedPassport);
          })
        );
        return passportsWithOwner;
      }

      async searchPassports(userSearchParameters: any): Promise<Passport[]> {
        
        const searchConditions: any = {};

        console.log("user search params", userSearchParameters);
        
        for (const key in userSearchParameters) {
          console.log("key",key);
          if (userSearchParameters.hasOwnProperty(key)) {

            const value=userSearchParameters[key];
            console.log("value", value);
            if (value !== '0' && value !== "") 
            searchConditions[key] = value;
          }
        }
        console.log("parametri za pretragu",searchConditions);
        searchConditions['isPrivate'] = false;
    
        const passports = await this.passportModel.find(searchConditions).populate('owner').exec();
        console.log("passports", passports);
       
        return passports;
      }


      async getCitySatistic(city:string):Promise<any>{

        console.log("city", city);

        const aggregateResult = await this.passportModel.aggregate([
          { $match: { city: city } },
          {
            $group: {
              _id: "$energyClass",
              averageAnnualHeatingNeed: { $avg: "$annualHeatingNeed" },
            }
          },

        ]).exec();
        

        console.log(aggregateResult);

        return aggregateResult;
      }
    
}
