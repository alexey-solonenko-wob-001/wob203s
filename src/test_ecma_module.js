console.log('test ecma module');
import "core-js/stable";
import "regenerator-runtime/runtime";
import util from 'util';

function* forGenerator(steps) {
   for(let i = 0;  i < steps;i++){
       if(i % (1e7 -2)  === 0) { 
           console.log('generator: '+ i);
           console.log(new Date());
       }
       yield i;
   }
}

//const gen = forGenerator();

const asyncGen = (steps) => {
    const gen = forGenerator(steps);

    const closure = ()=>{
        if(gen.next().value > steps){
            return 'done';
        } else {
            setImmediate(closure);
        }
    }

    return closure();
};
//asyncGen(10e7);

console.log('calling next()');

function asyncAvg(n, avgCB) {
    // Save ongoing sum in JS closure.
    var sum = 0;
    function help(i, cb) {
        sum += i;
        if (i % (1e7 -2)  === 0) {
            console.log('colusre i: ' + i);
            console.log(new Date());
        }
        if (i == n) {
            cb(sum);
            return;
        }

        // "Asynchronous recursion".
        // Schedule next operation asynchronously.
        setImmediate(help.bind(null, i + 1, cb));
    }

    // Start the helper, with CB to call avgCB.
    help(1, function (sum) {
        var avg = sum / n;
        avgCB(avg);
    });
}

// asyncAvg(10e7, function (avg) {
//     console.log('avg of 1-n: ' + avg);
// });


export default {};

// (async () => {
//     /* this blocks, need to wait till promises phase - after poll*/
//     // const sum = async (i) => {
//     //     if (i % 100000 === 0) {
//     //         console.log('async for loop:  ' + i)
//     //     }
//     // }
//     const sum = (i) => {
//         if(i % (1e7 -2) === 0){
//             console.log('partitioned for loop: ' + i);
//             console.log(new Date());
//         }
//     }

//     // const setImmediatePromise = () => new Promise((resolve, reject)=>{
//     //     setImmediate(resolve);
//     // });
//     const setImmediatePromise = util.promisify(setImmediate);

//     for (let i = 0; i < 10e7; i++) {
//         //await sum(i);
//         sum(i);
//         await setImmediatePromise();    }
// })();
console.log(new Date());

/*
set immediate promise time 46 seconds
closure even with sum is 27 seconds
generators 28 seconds ? 
*/