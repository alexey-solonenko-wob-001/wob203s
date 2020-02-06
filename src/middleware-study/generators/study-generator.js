import express from 'express';

const studyGeneratorRouter = express.Router();

/** TODO to delete and clean-up testing part  */
//port =  3001;
studyGeneratorRouter.get('/for', (req, res) => {
    console.log('startig processing for request');
    const genFactory = function* () {
        for (let i = 0; i < 10e7; i++) {
            if (i % 1000000 === 0) console.log('processing for: ' + i);
            yield i;
        }
    }
    const gen = genFactory();
    const forHandler = function () {
        let i = gen.next().value;
        if (i > (10e6 - 2)) {
            res.send('Long processing of for completed ');
            return;
        } else {
            setImmediate(forHandler);
        }
    }
    forHandler();

}
);



const asyncToHandler = async () => {


    const forHandler = () => new Promise((resolve, reject) => {
        const genFactory = function* () {
            for (let i = 0; i < 10e7; i++) {
                if (i % 100000 === 0) console.log('processing  to: ' + i);
                yield i;
            }
        }

        const gen = genFactory();
        const promiseHandler = () => {
            let i = gen.next().value;
            if (i > (10e5 - 2)) {
                console.log('processing completed');
                resolve();
            } else {
                setImmediate(promiseHandler);
            }
        };
        promiseHandler();
    });
    // await forHandler();
    // await forHandler();
    // await forHandler();
    await Promise.all(Array(3).fill({}).map(forHandler));
};

studyGeneratorRouter.get('/to', async (req, res) => {
    console.log('startig processing to request');
    console.log(asyncToHandler);
    await asyncToHandler();
    console.log('request processed');

    res.send('Long processing of to completed ');

}
);


export const test = { test: 'test'};

export { studyGeneratorRouter };