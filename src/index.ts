import Chat from './Chat/Chat';

document.cookie = "username=" + window.location.search.substr(1).split('=')[1];

let el = document.getElementById('application');
(new Chat(el)).render();