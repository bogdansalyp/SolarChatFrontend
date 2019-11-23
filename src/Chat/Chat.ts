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

        const messageField = document.getElementById('dialogview-page');
        const createMessageForm = <HTMLFormElement> document.getElementById('createMessageData');
        const newMessage = new MessageComponent(messageField);

        (<any>window).socket = new WebSocket(BACKEND_ADDRESS + '/chat');

        (<any>window).socket.onopen = function(result) {
            console.log('Соединение установлено')
        };

        // (<any>window).socket.on("headers", function(headers) {
        //     headers["set-cookie"] = document.cookie;
        // });

        (<any>window).socket.onclose = function(event) {
        if (event.wasClean) {
            console.log('cоединение закрыто');
        } else {
            console.log('соединения как-то закрыто');
        }
        };
        
        let data = null;

        (<any>window).socket.onmessage = function(event) {
            console.log("пришли данные " + event.data);
            data = JSON.parse(event.data);
            newMessage.render({messageAuthor: data.user_name_sender + ':', classForBg: '', messageContent: data.text});
        };
        
        (<any>window).socket.onerror = function(event) {
            console.log("ошибка " + event.message);
        };

        createMessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const message = createMessageForm.elements['message'].value;

            if (message != '') {
                let username = 'ADshishova';
                if (data != null) {
                    username = data.user_name_sender;
                    console.log(username);
                }
                (<any>window).socket.send(JSON.stringify({id_sender: 5, username_recipient: username, text: message}));
                newMessage.render({messageAuthor: 'Вы:', classForBg: 'your-message_background', messageContent: message});
            }
    
            createMessageForm.elements['message'].value = '';
        });
    }
}