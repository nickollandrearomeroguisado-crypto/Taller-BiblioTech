import { validationResult } from 'express-validator'

export const validarRoles = (res, req) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: result.array().map((e) => ({ field: e.path, msg: e.msg }))
        })
    }

    next()
}