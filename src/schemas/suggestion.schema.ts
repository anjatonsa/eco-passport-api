import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SuggestionDocument = HydratedDocument<Suggestion>;

@Schema()
export class Suggestion {
    @Prop({ required: true })
    energyClass: string;
    
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
}

export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);