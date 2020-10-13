import { User } from './User';

export interface Review {
    _id?: string;
    user: User;
    topic: string;
    date?: Date;
    text: string;
    mark: number;
}
