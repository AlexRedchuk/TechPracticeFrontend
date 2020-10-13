import { User } from './User';
import { Tour } from './Tour';

export interface OrderLog {
    _id?: string;
    user: User;
    tour: Tour;
}
