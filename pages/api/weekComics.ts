import axios from 'axios'
import nextConnect from 'next-connect'
import comicTitleSplit from '../../utils/comicTitleSplit'
import filterComicVariants from '../../utils/filterComicVariants'

const handler = nextConnect()

handler.get(async (req: any, res: any) => {
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
        console.error(err)
        res.status(500)
    }
})

export default handler
