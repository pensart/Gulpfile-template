(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _moduMath = require('./modu-math');

var simpleMath = _interopRequireWildcard(_moduMath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var total = simpleMath.testAdd(4, 5);
var subtotal = simpleMath.testSubtract(6, 1);
console.log(total, subtotal);

},{"./modu-math":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
