import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import auth from '../../middleware/auth'
import passport from '../../lib/passport'

const handler = nextConnect()

handler
    .use(auth)
    .post(passport.authenticate('local'), (req: any, res: NextApiResponse) => {
        res.json({ user: req.user })
    })

export default handler
