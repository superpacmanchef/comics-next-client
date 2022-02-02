import bcrypt from 'bcrypt'
import dao, { searchByUsername, insertUser } from './userDatabase'

const saltRound = 10

// eslint-disable-next-line import/prefer-default-export
export const userExist = async (username: string) => {
    return searchByUsername(username).then((entries) => {
        if (entries !== null) {
            return true
        }
        return false
    })
}

export const findUserByUsername = async (username: string) => {
    return searchByUsername(username).then((entries) => {
        if (entries != null) {
            return entries
        }
        return false
    })
}

export const validatePassword = async (user: any, password: any) => {
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
    return userExist(username).then((exist) => {
        if (!exist) {
            return bcrypt.genSalt(saltRound, (err1, salt) => {
                bcrypt.hash(password, saltRound, (err2, hash) => {
                    insertUser(username, email, hash)
                    return exist
                })
            })
        }
        return exist
    })
}
