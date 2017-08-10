(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _moduMath = require('./modu-math');

var simpleMath = _interopRequireWildcard(_moduMath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//testing

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxidW5kbGUtYW5vdGhlci5qcyIsInNyY1xcanNcXG1vZHUtbWF0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0lBQVksVTs7OztBQUNaOztBQUVBLElBQU0sUUFBUSxXQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsQ0FBZDtBQUNBLElBQU0sV0FBVyxXQUFXLFlBQVgsQ0FBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsQ0FBakI7QUFDQSxRQUFRLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLFFBQW5COzs7Ozs7Ozs7a0JDTGUsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQ3pCLFdBQU8sSUFBSSxDQUFYO0FBQ0gsQzs7UUFHZSxPLEdBQUEsTztBQUhmOztBQUVEO0FBQ08sU0FBUyxPQUFULENBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXNCO0FBQ3pCLFdBQU8sSUFBSSxDQUFYO0FBQ0g7O0FBRUQ7QUFDTyxJQUFNLHNDQUFlLFNBQWYsWUFBZSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQVM7QUFDakMsV0FBTyxJQUFJLENBQVg7QUFDSCxDQUZNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIHNpbXBsZU1hdGggZnJvbSAnLi9tb2R1LW1hdGgnO1xyXG4vL3Rlc3RpbmdcclxuXHJcbmNvbnN0IHRvdGFsID0gc2ltcGxlTWF0aC50ZXN0QWRkKDQsNSk7XHJcbmNvbnN0IHN1YnRvdGFsID0gc2ltcGxlTWF0aC50ZXN0U3VidHJhY3QoNiwxKTtcclxuY29uc29sZS5sb2codG90YWwsIHN1YnRvdGFsKTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSxiKSB7XHJcbiAgICByZXR1cm4gYSAvIGI7XHJcbn07XHJcblxyXG4vLyB5b3UgY2FuIGV4cG9ydCBhIG5hbWVkIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0QWRkKGEsYikge1xyXG4gICAgcmV0dXJuIGEgKyBiO1xyXG59O1xyXG5cclxuLy8gb3IgYSB2YXJpYWJsZVxyXG5leHBvcnQgY29uc3QgdGVzdFN1YnRyYWN0ID0gKGEsYikgPT4ge1xyXG4gICAgcmV0dXJuIGEgLSBiO1xyXG59O1xyXG4iXX0=
