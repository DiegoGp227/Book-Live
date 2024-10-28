const cookies = (req, res, next) => {
    const { token } = req.cookies; 

    if (token) {
        next();
    } else {
        res.status(401).json({ message: "You are authenticated." });
    }
};

export default cookies;