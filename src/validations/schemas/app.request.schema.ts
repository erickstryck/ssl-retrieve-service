import * as Joi from 'joi';

export default Joi.object({
    targetUrl: Joi.string().uri().required()
}).required();