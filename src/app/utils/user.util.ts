import { User } from '../models/user.model';

export class UserUtil {
    static get(): User {
        const data = localStorage.getItem('contatinhos.user');
        if (!data) return null;
        return JSON.parse(data);
    }
    static set(user: User) {
        localStorage.setItem('contatinhos.user', JSON.stringify(user));
    }
    static clear() {
        localStorage.removeItem('contatinhos.user');
    }
}