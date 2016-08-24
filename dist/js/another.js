'use strict';

function runThis() {
    var i = arguments.length <= 0 || arguments[0] === undefined ? 'default value' : arguments[0];

    document.write(i);
}

runThis('Hello World</br>');

runThis();