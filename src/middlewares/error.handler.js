import pkg from 'pg';
const { DatabaseError } = pkg;

export function logErrors(err, req, res, next) {
    // eslint-disable-next-line no-console
    console.error(err);
    next(err);
}

export function dbErrorHandler(err, req, res, next) {
    if (err instanceof DatabaseError) {
        return res.status(409).json({
            ok: false,
            message: err.message,
        });
    }
    next(err);
}

export function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        return res
            .status(output.statusCode)
            .json({ ok: false, ...output.payload });
    }
    next(err);
}

export function errorHandler(err, req, res, next) {
    res.status(500).json({
        ok: false,
        message: err.message,
    });
    next();
}
