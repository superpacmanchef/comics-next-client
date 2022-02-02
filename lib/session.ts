import { parse, serialize } from 'cookie'
import { createLoginSession, getLoginSession } from './auth'

function parseCookies(req: any) {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies

    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie
    return parse(cookie || '')
}

export default function session({
    name,
    secret,
    cookie: cookieOpts,
}: {
    name: any
    secret: any
    cookie: any
}) {
    return async (req: any, res: any, next: any) => {
        const cookies = parseCookies(req)
        const token = cookies[name]
        let unsealed = {}

        if (token) {
            try {
                // the cookie needs to be unsealed using the password `secret`
                unsealed = await getLoginSession(token, secret)
            } catch (e) {
                // The cookie is invalid
            }
        }

        req.session = unsealed

        // We are proxying res.end to commit the session cookie
        const oldEnd = res.end
        res.end = async function resEndProxy(...args: any[]) {
            if (res.finished || res.writableEnded || res.headersSent) return
            if (cookieOpts.maxAge) {
                req.session.maxAge = cookieOpts.maxAge
            }

            const newToken = await createLoginSession(req.session, secret)

            res.setHeader('Set-Cookie', serialize(name, newToken, cookieOpts))
            oldEnd.apply(this, args)
        }

        next()
    }
}
