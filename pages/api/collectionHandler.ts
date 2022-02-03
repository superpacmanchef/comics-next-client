/* eslint-disable no-underscore-dangle */
import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { insertCollection, removeCollection } from '../../lib/userDatabase'

const handler = nextConnect()

handler
    .use(auth)
    .use((req: any, res: any, next) => {
        if (!req.user) {
            res.status(401).send('unauthenticated')
        } else {
            next()
        }
    })
    .get((req: any, res: any) => {
        const { collection } = req.user
        res.json({ collection: { collection } })
    })
    .post(async (req: any, res: any) => {
        const { comic } = req.body
        try {
            const collection = await insertCollection(req.user._id, comic)
            if (collection) {
                res.status(200).json({ collection })
            } else {
                res.status(500)
            }
        } catch (err) {
            res.status(500)
        }
    })
    .delete(async (req: any, res: any) => {
        const { diamond_id } = req.body
        try {
            const collection = await removeCollection(req.user._id, diamond_id)
            if (collection) {
                res.status(200).json({ collection })
            } else {
                res.status(500)
            }
        } catch (err) {
            res.status(500)
        }
    })
// .put((req: any, res: any) => {
//     const { name } = req.body
//     const user = updateUserByUsername(req, req.user.username, { name })
//     res.json({ user })
// })

export default handler
