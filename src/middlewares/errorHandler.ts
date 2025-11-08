import { Request, Response, NextFunction } from 'express';

class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = (err as any).statusCode || 500;

    console.error('ERRO:', err.stack);

    let errorMessage = 'Ocorreu um erro interno no servidor.';

    if (statusCode >= 400 && statusCode < 500 || (err as ApiError).isOperational) {
        errorMessage = err.message;
    }

    if (process.env.NODE_ENV === 'development') {
        console.error('ERRO INTERNO:', err.stack);
    }

    res.status(statusCode).json({
        error: {
            code: statusCode,
            message: errorMessage,
        },
    });
};

export { ApiError };