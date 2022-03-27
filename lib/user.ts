import bcrypt from 'bcrypt'
import { insertUser, searchByEmail } from './userDatabase'

const saltRound = 10

export const userExist = async (username: string) => {
    return searchByEmail(username).then((entries) => {
        if (entries !== null) {
            return true
        }
        return false
    })
}

export const findUserByEmail = async (username: string) => {
    return searchByEmail(username).then((entries) => {
        if (entries != null) {
            return entries
        }
        return false
    })
}

export const validatePassword = async (user: any, password: any) => {
    if (!user) return false
    const result = await bcrypt.compare(password, user.password)
    if (result) {
        return true
    }
    return false
}

export const createUser = (
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
) => {
    if (password !== passwordRepeat) {
        return false
    }
    return userExist(email).then((exist) => {
        if (!exist) {
            bcrypt.genSalt(saltRound, (err1, salt) => {
                bcrypt.hash(password, saltRound, (err2, hash) => {
                    insertUser(username, email, hash)
                })
            })
            return true
        }
        return false
    })
}
