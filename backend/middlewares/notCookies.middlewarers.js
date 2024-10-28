const notCookies = (req, res, next) => {
    const { token  } = req.cookies;

    if (!token ) {
        next();
        res.redirect("../../frontend/pages/login.html")
    } else {
        res.status(401).json({ message: "You not are authenticated." });
    }
};

export default notCookies;