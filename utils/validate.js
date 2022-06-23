const Validator = require('validatorjs');
const validator = (body, rules, recipeMessages, callback) => {

    const validation = new Validator(body, rules, recipeMessages);
    
    validation.passes(() => callback(null, true));
    
    validation.fails(() => callback(validation.errors, false));
    
    };
    
    
    
    module.exports = validator;