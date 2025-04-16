import { makeAutoObservable } from 'mobx';

class ModalStore {
    isOpen = false;

    constructor() {
        makeAutoObservable(this);
    }

    openModal() {
        this.isOpen = true;
    }

    closeModal() {
        this.isOpen = false;
    }

    toggleModal() {
        this.isOpen = !this.isOpen;
    }
}

const modalStore = new ModalStore();
export default modalStore;
