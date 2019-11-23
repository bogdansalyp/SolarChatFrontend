import ChatTemplate from './Chat.hbs';
import './Chat.scss';

export default class BoardChangeView {
    el: HTMLElement;

    constructor(el) {
        this.el = el;
    }

    render() {
        this.el.innerHTML += ChatTemplate();
    }
}