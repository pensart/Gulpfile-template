(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _moduMyfirst = require('./modu-myfirst');

var _moduMyfirst2 = _interopRequireDefault(_moduMyfirst);

var _moduMath = require('./modu-math');

var simpleMath = _interopRequireWildcard(_moduMath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'Guy',
    lastname = 'Pensart',
    fullname = name + lastname;
var add = function add(a, b) {
    return a + b;
};

console.log(fullname);

// This wil get the default export

(0, _moduMyfirst2.default)('Premiere');

// This will get them by defining the name

var defaultFunction = (0, simpleMath.default)(9, 3);
var totaal = (0, _moduMath.testAdd)(3, 3);
var subtotaal = (0, _moduMath.testSubtract)(6, 2);

console.log(defaultFunction);
console.log(totaal);
console.log(subtotaal);

// This wil import all functions in a object


var total = simpleMath.testAdd(4, 5);
var subtotal = simpleMath.testSubtract(6, 1);
var division = simpleMath.default(8, 2);

console.log('Add= ' + total + ' Subtract= ' + subtotal + ' Division= ' + division);

},{"./modu-math":2,"./modu-myfirst":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (a, b) {
    return a / b;
};

exports.testAdd = testAdd;
;

// you can export a named function
function testAdd(a, b) {
    return a + b;
};

// or a variable
var testSubtract = exports.testSubtract = function testSubtract(a, b) {
    return a - b;
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (info) {
    console.log("This is my very first es6module named " + info + ".");
};

},{}]},{},[1]);
