const userService = require('../service/user-service');
const UserService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BedRequest('Ошиька при валидации', errors.array()))
            }
            const { email, password } = req.body;
            console.log('333333333333>>>>>>>>>>>>>>>>>>>>>>>>', email, password );
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.send(userData);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.send(userData);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            res.send(token)

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.send(userData);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            return res.send(users)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = new UserController();