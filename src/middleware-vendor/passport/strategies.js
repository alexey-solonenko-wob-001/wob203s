import passport from 'passport';
import passportLocal from 'passport-local';

const fakeDb = {
    'user1':'user1',
    'user2':'user2',
};

const LocalStrategy = passportLocal.Strategy;

const localStrategy = new LocalStrategy(
    function(username, password, done) {
        console.log('strategy verify callback is called',username,password);
        if(!fakeDb[username]) return done(null,false,{message:'User not found'});
        if(fakeDb[username] !== password) return done(null,false,{message:'Wrong password'});
        return done(null,{username});
    }
  );

  export { localStrategy };