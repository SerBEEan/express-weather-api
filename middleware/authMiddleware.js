const checkAuth = require('../grpc'); 

module.exports = function(req, res, next) {
    const username = req.headers['own-auth-username'];

    checkAuth(username, (isAuth) => {
        if (!isAuth) {
            res.status(403).send('Пользователь не авторизован');
        } else {
            next();
        }
    });
};
