/*
 * This code is broken! Can you figure out why
 * and fix it?
 */
/*
 * variables without var, val or const becomes global, so the value of x is
 * messed
 */
function doubleIfEven(n) {
    var x = n;
    if (even(x)) return double(x);
    return x;
}

function even(a) {
    var x = a;
    if (x%2 == 0) {
        x = true;
    }
    else {
        x = false;
    }
    return x;
}

function double(a) {
    return a*2;
}


// Get command line argument and run function

const input = process.argv.slice(2).map(x => parseInt(x));
if (input === undefined) {
    throw new Error(`input not supplied`);
}

for (let num of input) {
    console.log(doubleIfEven(num));
}
