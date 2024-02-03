import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SuggestionDocument = HydratedDocument<Suggestion>;

@Schema()
export class Suggestion {
    @Prop({ required: true })
    energyClass: string;

    @Prop({ required: true })
    annualHeatingNeed: number;

    @Prop()
    energySources: string[];    

    @Prop()
    heatingType: string[];

    @Prop()
    ventilation: string;

    @Prop()
    hotWater: string;

    @Prop()
    coolingType: string;

    @Prop()
    CO2Emission: number;
}

export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);