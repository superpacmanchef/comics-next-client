// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | null>
) {
    if (req.method === 'POST') {
        const { comic } = req.body as { comic: Comic_ShortBoxed_SplitTitle }

        try {
            const idRes = await axios.get<Metron_ID_Res>(
                `https://metron.cloud/api/issue/?number=${comic.issue_no}&publisher_name=${comic.publisher}&series_name=${comic.title}`,
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
                res.status(200).json(comicData.data.image)
                res.end()
            } else {
                const data = await axios.get(
                    'https://comicvine.gamespot.com/api/search/',
                    {
                        params: {
                            api_key: process.env.COMIC_VINE_KEY,
                            query: `${comic.title} ${comic.issue_no} ${comic.diamond_id} ${comic.release_date} comic`,
                            format: 'json',
                            resource_type: 'issue',
                        },
                    }
                )

                res.status(200).json(data.data.results[0].image.medium_url)
                res.end()
            }
        } catch (err) {
            console.log(err)

            res.status(401).end()
        }
    } else {
        res.status(405).end()
    }
}
