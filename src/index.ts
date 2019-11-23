import Chat from './Chat/Chat';

document.cookie = "seesion_key=" + window.location.search.substr(1).split('=')[1];

let el = document.getElementById('application');
(new Chat(el)).render();