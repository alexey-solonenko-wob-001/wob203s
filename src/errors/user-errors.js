export { userErrors };

/**
 * @typedef {Object} appErrors
 * @property {Number} userNotFound
 * @property {Number} userPasswordIsInvalid
 * 
 */

const errors = [
    'userNotFound',
    'userPasswordIsInvalid',
];

 /** @type appErrors */
let userErrors ={};
errors.forEach((err,idx) => {
    userErrors[err]= ++idx;
});

userErrors = Object.freeze(userErrors);

