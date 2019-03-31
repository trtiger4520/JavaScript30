import CodeReverl from './codereverl.js';
import Min_List from './min-list.js';

const raverl = CodeReverl({selector: '.code-reveal'});
window.raverl = window.raverl ? window.raverl : raverl;
console.log('raverl:', raverl);