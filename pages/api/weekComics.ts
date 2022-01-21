// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import comicTitleSplit from '../../utils/comicTitleSplit'
import filterComicVariants from '../../utils/filterComicVariants'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Comic_ShortBoxed_SplitTitle[]>
) {
    if (req.method === 'GET') {
        const { week } = req.query
        const url = 'http://api.shortboxed.com'
        let ext = ''

        if (week === '0') {
            ext = '/comics/v1/previous'
        } else if (week === '1') {
            ext = '/comics/v1/new'
        } else {
            ext = '/comics/v1/future'
        }

        const api = url + ext

        try {
            const shortboxed = filterComicVariants(await axios.get(api))

            const shortboxedSplitTitle = shortboxed.map((comic) => {
                const [newComicTitle, issue_no] = comicTitleSplit(comic.title)

                return {
                    ...comic,
                    title: newComicTitle,
                    issue_no,
                }
            })
            res.status(200).json(shortboxedSplitTitle)
        } catch (err) {
            console.log(err)
            res.status(401).end()
        }
    } else {
        res.status(405).end()
    }
}
