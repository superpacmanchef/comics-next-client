/* eslint-disable no-underscore-dangle */
import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { insertPull, removePull } from '../../lib/userDatabase'

const handler = nextConnect()

handler
    .use(auth)
    .use((req: any, res: any, next) => {
        // This middleware to check if user is authenticated before continuing
        if (!req.user) {
            res.status(403).json([])
        } else {
            next()
        }
    })
    .get((req: any, res: any) => {
        const { pullList } = req.user
        res.json({ pullList: { pullList } })
    })
    .post(async (req: any, res: any) => {
        const { comic } = req.body

        try {
            const pullList = await insertPull(req.user._id, comic.toUpperCase())

            if (pullList) {
                res.status(200).json({
                    pullList: { pullList },
                })
            } else {
                res.status(500)
            }
        } catch (err) {
            res.status(500)
        }
    })
    .delete(async (req: any, res: any) => {
        const { comic } = req.body

        try {
            const pullList = await removePull(req.user._id, comic)
            if (pullList) {
                res.status(200).json({
                    pullList: { pullList },
                })
            } else {
                res.status(500)
            }
        } catch (err) {
            res.status(500)
        }
    })

export default handler
