import { validationResult } from 'express-validator'

export const validarJwt = (res, req) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json({
            of: false,
            errors: result.array().map((e) => ({ field: e.path, msg: e.msg }))
        
        })
    }

    next()
}