'use strict';

let name = 'Guy',
    lastname = 'Pensart',
    fullname = name + lastname;
let add = (a,b) => a + b;

console.log(fullname);

// This wil get the default export
import testModule from './modu-myfirst';
testModule('Premiere');

// This will get them by defining the name
import firstFunction, {testAdd, testSubtract} from './modu-math';
    let defaultFunction = firstFunction(9,3); 
    let totaal = testAdd(3,3);
    let subtotaal = testSubtract(6,2);
    
    console.log(defaultFunction);
    console.log(totaal);
    console.log(subtotaal)

// This wil import all functions in a object
import * as simpleMath from './modu-math';

    const total = simpleMath.testAdd(4,5);
    const subtotal = simpleMath.testSubtract(6,1);
    const division = simpleMath.default(8,2);
    
    console.log(`Add= ${total} Subtract= ${subtotal} Division= ${division}`);

