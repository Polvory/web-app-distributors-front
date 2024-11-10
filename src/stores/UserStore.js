// stores/UserStore.js
import { makeAutoObservable } from 'mobx';

class UserStore {
    user = null; // начальное значение

    constructor() {
        makeAutoObservable(this); // делает хранилище реактивным
    }

    setUser(user) {
        this.user = user; // сохраняем пользователя
    }

    clearUser() {
        this.user = null; // сбрасываем пользователя
    }
}

export const userStore = new UserStore();
