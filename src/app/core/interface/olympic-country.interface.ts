import { Participation } from "./participation.interface";

export interface OlympicCountry{
    id:number,
    country:string,
    participations:Participation[]
}