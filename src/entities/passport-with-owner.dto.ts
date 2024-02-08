import { User } from "src/schemas/user.schema";

export class PassportWithOwner{
    buildingCategory: string;
    address: string;
    city: string;
    constructionYear: string;
    area: number;
    energyClass: string;
    annualHeatingNeed: number;
    description: string;
    heatingType: string;
    energySources: string[];
    ventilation: string;
    hotWater: string;
    coolingType: string;
    totalFloors: number;
    CO2Emission: number;
    owner:User;
    isPrivate:boolean;
}