import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import auth from '../../middleware/auth'
import passport from '../../lib/passport'

const handler = nextConnect()

handler.use(auth).post((req: any, res: NextApiResponse) => {
    req.logout()
    res.send(true)
})

export default handler
