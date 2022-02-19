/* eslint-disable no-underscore-dangle */
import passport from 'passport'
import * as passportLocal from 'passport-local'
import { findUserByEmail, validatePassword } from './user'

const LocalStrategy = passportLocal.Strategy

passport.serializeUser(function (user: any, done) {
    // serialize the username into session
    done(null, user.email)
})

passport.deserializeUser(async (id: string, done) => {
    // deserialize the username back into user object
    const user = await findUserByEmail(id)
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
            const user = await findUserByEmail(username)
            const pass = await validatePassword(user, password)
            if (!user || pass === false) {
                done(null, null)
            } else {
                done(null, user)
            }
        }
    )
)

export default passport
