class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        const statusCode = 400;
        err = new ErrorHandler(message, statusCode);
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is Invalid - Try again`;
        const statusCode = 400;
        err = new ErrorHandler(message, statusCode);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Json web token is Expired - Try again`;
        const statusCode = 400;
        err = new ErrorHandler(message, statusCode);
    }

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        const statusCode = 400;
        err = new ErrorHandler(message, statusCode);
    }

    const errorMessage = err.errors
        ? Object.values(err.errors)
            .map(error => error.message)
            .join(" ")
        : err.message;

        console.log(errorMessage);

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;
