import { makeAutoObservable } from 'mobx';

class UploadedStore {
    data = []; // начальное значение

    constructor() {
        makeAutoObservable(this); // делает хранилище реактивным
    }

    setUploaded(newData) {
        const { typeAddId, files } = newData;

        const existingIndex = this.data.findIndex(item => item.typeAddId === typeAddId);

        if (existingIndex !== -1) {
            // Обновляем files, если запись существует
            this.data[existingIndex].files = files;
        } else {
            // Добавляем новую запись, если её нет
            this.data.push(newData);
        }
    }

    removeFileByIndex(typeAddId, fileIndex) {
        // Ищем объект с указанным typeAddId
        const item = this.data.find(item => item.typeAddId === typeAddId);

        if (item && item.files && fileIndex >= 0 && fileIndex < item.files.length) {
            // Удаляем файл по индексу, если он существует
            item.files.splice(fileIndex, 1);
        } else {
            console.warn("Либо запись с таким typeAddId не найдена, либо индекс файла вне диапазона");
        }
    }

    clearAll() {
        this.data = []; // сбрасываем пользователя
    }
}

export const uploadedStore = new UploadedStore();