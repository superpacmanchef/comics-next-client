/* eslint-disable no-underscore-dangle */
import passport from 'passport'
import * as passportLocal from 'passport-local'
import { findUserByUsername, validatePassword } from './user'

const LocalStrategy = passportLocal.Strategy

passport.serializeUser(function (user: any, done) {
    // serialize the username into session
    done(null, user.username)
})

passport.deserializeUser(async function (id: string, done) {
    // deserialize the username back into user object
    const user = await findUserByUsername(id)
    done(null, user)
})

passport.use(
    new LocalStrategy(
        { passReqToCallback: true },
        async (
            req: any,
            username: string,
            password: string,
            done: (
                err: any,
                user?: false | Express.User | null | undefined
            ) => void
        ) => {
            // Here you lookup the user in your DB and compare the password/hashed password
            const user = await findUserByUsername(username)
            const pass = await validatePassword(user, password)
            // Security-wise, if you hashed the password earlier, you must verify it
            // if (!user || await argon2.verify(user.password, password))
            if (!user || pass === false) {
                done(null, null)
            } else {
                done(null, user)
            }
        }
    )
)

export default passport
