import passport from 'passport';
import { localUserLoginStrategy } from '../middleware-vendor/passport/strategies.js';

passport.use(localUserLoginStrategy);

export const loginRouteHanlder = [

    (req, res, next) => {
        passport.authenticate('local', function (err, user, info) {
            console.log('from passport authenticate', err, user, info);
            console.log(req.body);
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                //return res.redirect('/users/' + user.username);
                next();
            });
        })(req, res, next)
    },
    (req, res, next) => {
        console.log('chaining,test', req.user);
        console.log('cookiers test', req.cookies);
        res.cookie('test', 'test');
    }
];