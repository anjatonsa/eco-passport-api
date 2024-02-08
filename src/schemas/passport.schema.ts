import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type PassportDocument = HydratedDocument<Passport>;

@Schema()
export class Passport {
    @Prop({ required: true })
    buildingCategory: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    constructionYear: string;

    @Prop({ required: true })
    area: number;
   
    @Prop({ required: true })
    energyClass: string;

    @Prop({ required: true })
    isPrivate: boolean;

    @Prop()
    annualHeatingNeed: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop()
    description: string;

    @Prop()
    heatingType: string;

    @Prop()
    energySources: string[];

    @Prop()
    ventilation: string;

    @Prop()
    hotWater: string;

    @Prop()
    coolingType: string;

    @Prop()
    totalFloors: number;

    @Prop()
    CO2Emission: number;

}

export const PassportSchema = SchemaFactory.createForClass(Passport);