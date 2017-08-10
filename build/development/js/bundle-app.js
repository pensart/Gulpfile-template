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
console.log('production enviroments added');

//sfqf

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxidW5kbGUtYXBwLmpzIiwic3JjXFxqc1xcbW9kdS1tYXRoLmpzIiwic3JjXFxqc1xcbW9kdS1teWZpcnN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBVUE7Ozs7QUFJQTs7SUFVWSxVOzs7Ozs7QUF0QlosSUFBSSxPQUFPLEtBQVg7QUFBQSxJQUNJLFdBQVcsU0FEZjtBQUFBLElBRUksV0FBVyxPQUFPLFFBRnRCO0FBR0EsSUFBSSxNQUFNLFNBQU4sR0FBTSxDQUFDLENBQUQsRUFBRyxDQUFIO0FBQUEsV0FBUyxJQUFJLENBQWI7QUFBQSxDQUFWOztBQUVBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUE7O0FBRUEsMkJBQVcsVUFBWDs7QUFFQTs7QUFFSSxJQUFJLGtCQUFrQixJQVNkLFVBVGMsVUFBYyxDQUFkLEVBQWdCLENBQWhCLENBQXRCO0FBQ0EsSUFBSSxTQUFTLHVCQUFRLENBQVIsRUFBVSxDQUFWLENBQWI7QUFDQSxJQUFJLFlBQVksNEJBQWEsQ0FBYixFQUFlLENBQWYsQ0FBaEI7O0FBRUEsUUFBUSxHQUFSLENBQVksZUFBWjtBQUNBLFFBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxRQUFRLEdBQVIsQ0FBWSxTQUFaOztBQUVKOzs7QUFHSSxJQUFNLFFBQVEsV0FBVyxPQUFYLENBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBQWQ7QUFDQSxJQUFNLFdBQVcsV0FBVyxZQUFYLENBQXdCLENBQXhCLEVBQTBCLENBQTFCLENBQWpCO0FBQ0EsSUFBTSxXQUFXLFdBQVcsT0FBWCxDQUFtQixDQUFuQixFQUFxQixDQUFyQixDQUFqQjs7QUFFQSxRQUFRLEdBQVIsV0FBb0IsS0FBcEIsbUJBQXVDLFFBQXZDLG1CQUE2RCxRQUE3RDtBQUNBLFFBQVEsR0FBUixDQUFZLDhCQUFaOztBQUVKOzs7Ozs7Ozs7a0JDakNlLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYztBQUN6QixXQUFPLElBQUksQ0FBWDtBQUNILEM7O1FBR2UsTyxHQUFBLE87QUFIZjs7QUFFRDtBQUNPLFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFzQjtBQUN6QixXQUFPLElBQUksQ0FBWDtBQUNIOztBQUVEO0FBQ08sSUFBTSxzQ0FBZSxTQUFmLFlBQWUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFTO0FBQ2pDLFdBQU8sSUFBSSxDQUFYO0FBQ0gsQ0FGTTs7Ozs7Ozs7O2tCQ1ZPLFVBQUMsSUFBRCxFQUFVO0FBQ3BCLFlBQVEsR0FBUiw0Q0FBcUQsSUFBckQ7QUFDSCxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBuYW1lID0gJ0d1eScsXHJcbiAgICBsYXN0bmFtZSA9ICdQZW5zYXJ0JyxcclxuICAgIGZ1bGxuYW1lID0gbmFtZSArIGxhc3RuYW1lO1xyXG5sZXQgYWRkID0gKGEsYikgPT4gYSArIGI7XHJcblxyXG5jb25zb2xlLmxvZyhmdWxsbmFtZSk7XHJcblxyXG4vLyBUaGlzIHdpbCBnZXQgdGhlIGRlZmF1bHQgZXhwb3J0XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJy4vbW9kdS1teWZpcnN0JztcclxudGVzdE1vZHVsZSgnUHJlbWllcmUnKTtcclxuXHJcbi8vIFRoaXMgd2lsbCBnZXQgdGhlbSBieSBkZWZpbmluZyB0aGUgbmFtZVxyXG5pbXBvcnQgZmlyc3RGdW5jdGlvbiwge3Rlc3RBZGQsIHRlc3RTdWJ0cmFjdH0gZnJvbSAnLi9tb2R1LW1hdGgnO1xyXG4gICAgbGV0IGRlZmF1bHRGdW5jdGlvbiA9IGZpcnN0RnVuY3Rpb24oOSwzKTsgXHJcbiAgICBsZXQgdG90YWFsID0gdGVzdEFkZCgzLDMpO1xyXG4gICAgbGV0IHN1YnRvdGFhbCA9IHRlc3RTdWJ0cmFjdCg2LDIpO1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhkZWZhdWx0RnVuY3Rpb24pO1xyXG4gICAgY29uc29sZS5sb2codG90YWFsKTtcclxuICAgIGNvbnNvbGUubG9nKHN1YnRvdGFhbClcclxuXHJcbi8vIFRoaXMgd2lsIGltcG9ydCBhbGwgZnVuY3Rpb25zIGluIGEgb2JqZWN0XHJcbmltcG9ydCAqIGFzIHNpbXBsZU1hdGggZnJvbSAnLi9tb2R1LW1hdGgnO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsID0gc2ltcGxlTWF0aC50ZXN0QWRkKDQsNSk7XHJcbiAgICBjb25zdCBzdWJ0b3RhbCA9IHNpbXBsZU1hdGgudGVzdFN1YnRyYWN0KDYsMSk7XHJcbiAgICBjb25zdCBkaXZpc2lvbiA9IHNpbXBsZU1hdGguZGVmYXVsdCg4LDIpO1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhgQWRkPSAke3RvdGFsfSBTdWJ0cmFjdD0gJHtzdWJ0b3RhbH0gRGl2aXNpb249ICR7ZGl2aXNpb259YCk7XHJcbiAgICBjb25zb2xlLmxvZygncHJvZHVjdGlvbiBlbnZpcm9tZW50cyBhZGRlZCcpO1xyXG5cclxuLy9zZnFmIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSxiKSB7XHJcbiAgICByZXR1cm4gYSAvIGI7XHJcbn07XHJcblxyXG4vLyB5b3UgY2FuIGV4cG9ydCBhIG5hbWVkIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0QWRkKGEsYikge1xyXG4gICAgcmV0dXJuIGEgKyBiO1xyXG59O1xyXG5cclxuLy8gb3IgYSB2YXJpYWJsZVxyXG5leHBvcnQgY29uc3QgdGVzdFN1YnRyYWN0ID0gKGEsYikgPT4ge1xyXG4gICAgcmV0dXJuIGEgLSBiO1xyXG59O1xyXG4iLCJleHBvcnQgZGVmYXVsdChpbmZvKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgVGhpcyBpcyBteSB2ZXJ5IGZpcnN0IGVzNm1vZHVsZSBuYW1lZCAke2luZm99LmApXHJcbn1cclxuIl19
