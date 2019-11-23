import ChatTemplate from './Chat.hbs';
import './Chat.scss';
import {BACKEND_ADDRESS} from '../config/Config';

export default class BoardChangeView {
    el: HTMLElement;

    constructor(el) {
        this.el = el;

        (<any>window).socket = new WebSocket(BACKEND_ADDRESS + '/chat');
    }

    render() {
        this.el.innerHTML += ChatTemplate();
        
        (<any>window).socket.onopen = function(result) {
            for (let i = 0; i < 3; i++) {
                (<any>window).socket.send(JSON.stringify({id_sender: 5, username_recipient: 'ADshishova', text: 'Hello, ADshishova!'}));
            }
        };

        (<any>window).socket.onmessage = function(result) {
        };
    }
}