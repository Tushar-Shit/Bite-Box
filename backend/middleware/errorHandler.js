const errorHandler = (err, req, res, next) => {
    console.error(err);

    return res.status(err.statusCode || 500).json({
        code: "failed",
        message: err.message || "Something went wrong"
    });
};
export default errorHandler;