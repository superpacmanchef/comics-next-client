import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
    .use(auth)
    .get((req: any, res: any) => {
        const { username } = req.user
        res.json({ user: { username } })
    })
    // .post((req, res) => {
    //     const { username, password, name } = req.body
    //     createUser(req, { username, password, name })
    //     res.status(200).json({ success: true, message: 'created new user' })
    // })
    .use((req: any, res: any, next) => {
        if (!req.user) {
            res.status(401).send('unauthenticated')
        } else {
            next()
        }
    })

export default handler
