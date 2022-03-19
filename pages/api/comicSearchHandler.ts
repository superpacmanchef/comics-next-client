/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler = nextConnect()

const getComicData = async (
    comicTitle: string,
    comicIssueNumber: string,
    comicMonth: string,
    comicYear: string,
    comicID: string,
    comicUPC: string
) => {
    let link = `https://metron.cloud/api/issue/?number=${comicIssueNumber}&series_name=${comicTitle}`

    if (comicMonth !== '') {
        link += `&cover_month=${comicMonth}`
    }
    if (comicYear !== '') {
        link += `&cover_year=${comicYear}`
    }

    if (comicID !== '') {
        link += `&sku=${comicID}`
    }

    if (comicUPC !== '') {
        link += `&upc=${comicUPC}`
    }

    const idRes = await axios.get<Metron_ID_Res>(link, {
        headers: {
            Authorization: `${process.env.METRON_BASIC_KEY}`,
        },
    })

    console.log(link)

    if (idRes.data.count > 0) {
        const metronComicID = idRes.data.results[0].id
        const comicData = await axios.get<Metron_Comics>(
            `https://metron.cloud/api/issue/${metronComicID}`,
            {
                headers: {
                    Authorization: `${process.env.METRON_BASIC_KEY}`,
                },
            }
        )
        return comicData.data
    }

    return null
}

handler
    .use(auth)
    .use((req: any, res: any, next) => {
        if (!req.user) {
            res.status(200).json([])
        } else {
            next()
        }
    })
    .post(async (req: any, res: any) => {
        const {
            comicTitle,
            comicIssueNumber,
            comicMonth,
            comicYear,
            comicID,
            comicUPC,
        } = req.body
        try {
            const data = await getComicData(
                comicTitle,
                comicIssueNumber,
                comicMonth,
                comicYear,
                comicID,
                comicUPC
            )
            if (data === null) {
                res.status(200).json(null)
            } else {
                const comicData: Comic_ShortBoxed_SplitTitle_Image = {
                    title: data.series.name,
                    issue_no: data.number,
                    publisher: data.publisher.name,
                    description: data.desc,
                    price: data.price,
                    creators: '',
                    release_date: data.store_date,
                    diamond_id: data.sku,
                    image: data.image,
                }

                res.status(200).json(comicData)
            }
        } catch (err) {
            res.status(500)
        }
    })

export default handler
