import axios from 'axios'
import nextConnect from 'next-connect'

const getPageData = async (comic: Comic_ShortBoxed_SplitTitle) => {
    const idRes = await axios.get<Metron_ID_Res>(
        `https://metron.cloud/api/issue/?number=${comic.issue_no}&series_name=${comic.title}&store_date=${comic.release_date}&sku=${comic.diamond_id}`,
        {
            headers: {
                Authorization: `${process.env.METRON_BASIC_KEY}`,
            },
        }
    )
    if (idRes.data.count > 0) {
        const comicID = idRes.data.results[0].id
        const comicData = await axios.get<Metron_Comics>(
            `https://metron.cloud/api/issue/${comicID}`,
            {
                headers: {
                    Authorization:
                        'BASIC c3VwZXJwYWNtYW5jaGVmOktOSE14TUM0Sm1lUHhrSA==',
                },
            }
        )
        return comicData.data.image
    }
    const data = await axios.get('https://comicvine.gamespot.com/api/search/', {
        params: {
            api_key: process.env.COMIC_VINE_KEY,
            query: `${comic.title} ${comic.issue_no} ${comic.diamond_id} ${comic.release_date} comic`,
            format: 'json',
            resource_type: 'issue',
        },
    })

    return data.data.results[0].image.medium_url
}

const handler = nextConnect()

handler.post(async (req: any, res: any) => {
    const { comic } = req.body as { comic: Comic_ShortBoxed_SplitTitle }

    try {
        const data = await getPageData(comic)

        res.status(200).json(data)
        res.end()
    } catch (err) {
        res.status(500)
    }
})

export default handler
