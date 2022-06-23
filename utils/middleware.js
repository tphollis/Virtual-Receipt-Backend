const validator = require( './validate');


const recipt = (req, res, next) => {
    const validation_rule = {
        Customer_Name: "required|string",
        __typename: "required|string",
        __typename2: "required|string",
        __typename3: "required|string",
        
    }
    validator(req.body, validation_rule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed'
                })
        }
    })
}

module.exports = {
    recipee_secure
}
