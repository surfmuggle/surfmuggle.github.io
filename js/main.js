import { pixelmatch } from '../libs/pixelmatch.js';
import { shout } from '../libs/shout.js';


function callFromModule(){
    alert("what are you doing?");
    alert(shout("what are you doing? I am shouting!"));

}

export {  callFromModule };