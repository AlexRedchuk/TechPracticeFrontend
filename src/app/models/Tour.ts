import { Country } from './Country';
import { Hotel } from './Hotel';

export interface Tour {
    _id: string;
    country: Country;
    hotel: Hotel;
    price: number;
    departure: string;
    date: Date;
    duration: number;
    adults: number;
    children: number;
    room: string;
    discount: number;
    medInsurance: string;
    tourOperator: string;
}
