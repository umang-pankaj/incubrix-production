/**
 * Global error handling middleware
 * Catches all errors and sends appropriate JSON responses
 */
export function errorHandler(err, req, res, next) {
    // Log error details to console
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        url: req.url,
        method: req.method,
    });

    // Handle specific error types
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authentication required',
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.message,
        });
    }

    // Default error response
    const statusCode = err.statusCode || err.status || 500;

    res.status(statusCode).json({
        error: err.name || 'Internal Server Error',
        message: err.message || 'Something went wrong',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}

/**
 * 404 Not Found handler
 * Place before error handler in middleware chain
 */
export function notFoundHandler(req, res) {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.url} not found`,
    });
}
