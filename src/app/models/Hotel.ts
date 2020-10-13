import { Country } from './Country';

export interface Hotel {
    _id: string;
    name: string;
    country: Country;
    city: string;
    photo: string;
    stars: number;
    wifi: boolean;
    pool: string;
    beach: string;
    food: ['All inclusive', 'Breakfast and dinner', 'Only breakfast'];
    room_mark: number;
    service_mark: number;
    cleanless_mark: number;
    food_mark: number;
    infrastructure_mark: number;
    recommendation: boolean;
    best_price: boolean;
}
