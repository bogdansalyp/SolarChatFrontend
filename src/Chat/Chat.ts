import ChatTemplate from './Chat.hbs';
import './Chat.scss';
import {BACKEND_ADDRESS} from '../config/Config';
import MessageComponent from '../components/Message/Message';

export default class BoardChangeView {
    el: HTMLElement;

    constructor(el) {
        this.el = el;
    }

    render() {
        this.el.innerHTML += ChatTemplate();
        (<any>window).socket = new WebSocket(BACKEND_ADDRESS + '/chat');

        (<any>window).socket.onopen = function(result) {
            console.log('Соединение установлено')
            for (let i = 0; i < 3; i++) {
                (<any>window).socket.send(JSON.stringify({id_sender: 5, username_recipient: 'ADshishova', text: 'Hello, ADshishova!'}));
            }
        };

        // (<any>window).socket.onclose = function(event) {
        // if (event.wasClean) {
        //     console.log('cоединение закрыто');
        // } else {
        //     console.log('соединения как-то закрыто');
        // }
        // };
        
        (<any>window).socket.onmessage = function(event) {
            console.log("пришли данные " + event.data);
        };
        
        (<any>window).socket.onerror = function(event) {
            console.log("ошибка " + event.message);
        };

        (<any>window).socket.onmessage = function(result) {
        };

        const messageField = document.getElementById('dialogview-page');
        const createMessageForm = <HTMLFormElement> document.getElementById('createMessageData');
        createMessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const message = createMessageForm.elements['message'].value;
            const newMessage = new MessageComponent(messageField);
            newMessage.render({messageAuthor: 'Username', messageContent: message});

            (<any>window).socket.send(JSON.stringify({id_sender: 5, username_recipient: 'ADshishova', text: 'JHJJJJJJ'}));
    
            createMessageForm.elements['message'].value = '';
        });
    }
}