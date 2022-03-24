import nextConnect from 'next-connect'
import { createUser } from '../../lib/user'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
    .use(auth)
    .post(async (req: any, res: any) => {
        const { email, username, password, passwordRepeat } = req.body
        try {
            const resp = await createUser(
                username,
                email,
                password,
                passwordRepeat
            )
            res.status(200).json(
                resp
                    ? { success: true, message: 'created new user' }
                    : { success: false, message: 'Error' }
            )
        } catch (err) {
            res.sendStatus(500)
        }
    })
    .use((req: any, res: any, next) => {
        if (!req.user) {
            res.status(403).send(null)
        } else {
            next()
        }
    })
    .get((req: any, res: any) => {
        const { username } = req.user
        res.json({ user: { username } })
    })

export default handler
