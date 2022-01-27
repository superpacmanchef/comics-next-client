import bcrypt from 'bcrypt'
import dao from './userDatabase'

const saltRound = 10

// eslint-disable-next-line import/prefer-default-export
export const userExist = (username: string) => {
    return new Promise<boolean>((resolve, reject) => {
        dao.searchByUsername(username).then((entries) => {
            if (entries !== null) {
                resolve(true)
            }
            resolve(false)
        })
    })
}

export const findUserByUsername = async (username: string) => {
    return dao.searchByUsername(username).then((entries) => {
        if (entries != null) {
            return entries
        }
        return false
    })
}

export const validatePassword = async (user: any, password: any) => {
    console.log(user.password, password, 'password')
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            return true
        }
        return false
    })
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
                    dao.insertUser(username, email, hash)
                    return exist
                })
            })
        }
        return exist
    })
}
