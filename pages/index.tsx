/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import TopNav from '../components/Nav/topNav'
import MainButton from '../components/elements/mainButton'
import filterComicPublishers from '../utils/filterComicPublishers'
import DropDown from '../components/elements/dropDown'
import ComicComponent from '../components/Comics/comicComponent'
import filterComicVariants from '../utils/filterComicVariants'
import comicTitleSplit from '../utils/comicTitleSplit'
import Layout from '../components/layout'
import { usePull, useUser } from '../lib/hooks'

type HomeProps = {
    weekComics: Comic_ShortBoxed_SplitTitle_Image[]
}

export const getServerSideProps = async () => {
    const shortboxed = filterComicVariants(
        await axios.get('http://api.shortboxed.com/comics/v1/new')
    )

    const shortboxedSplitTitle = shortboxed.map((comic) => {
        const [newComicTitle, issue_no] = comicTitleSplit(comic.title)

        return {
            ...comic,
            title: newComicTitle,
            issue_no,
        }
    })

    const weekArrayWithImage: Comic_ShortBoxed_SplitTitle_Image[] =
        shortboxedSplitTitle.map((comic: Comic_ShortBoxed_SplitTitle) => {
            return { ...comic, image: 'null' }
        })

    return {
        props: {
            weekComics: weekArrayWithImage,
        },
    }
}

const Home: NextPage<HomeProps> = (props) => {
    const { weekComics } = props

    const [chosenWeeksComics, updateChosenWeeksComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [chosenWeeksComicsFilter, updateChosenWeeksComicsFilter] = useState<
        Comic_ShortBoxed_SplitTitle_Image[] | null
    >(null)
    const [currentChosenWeek, updateCurrentChosenWeek] = useState(1)
    const [lastChosenWeek, updateLastChosenWeek] = useState<number>(1)
    const [currentPublisher, updateCurrentPublisher] = useState('ALL')

    const [user] = useUser()
    const [pullList] = usePull()

    const getWeeksComics = () => {
        if (currentChosenWeek !== lastChosenWeek) {
            updateLastChosenWeek(currentChosenWeek)
            axios
                .get(`/api/weekComics?week=${currentChosenWeek}`)
                .then((res) => {
                    const weekArrayWithImage: Comic_ShortBoxed_SplitTitle_Image[] =
                        res.data.map((comic: Comic_ShortBoxed_SplitTitle) => {
                            return { ...comic, image: 'null' }
                        })

                    updateChosenWeeksComics(weekArrayWithImage)
                    const filteredChosenWeeksComics = filterComicPublishers(
                        weekArrayWithImage,
                        currentPublisher,
                        user ? pullList : { pullList: [] }
                    )
                    updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
                })
                .catch((err) => console.log(err))
        } else {
            const filteredChosenWeeksComics = filterComicPublishers(
                chosenWeeksComics,
                currentPublisher,
                pullList
            )

            updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
        }
    }

    useEffect(() => {
        updateChosenWeeksComics(weekComics)
        const filteredChosenWeeksComics = filterComicPublishers(
            weekComics,
            'ALL',
            user ? pullList : { pullList: [] }
        )
        updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
    }, [pullList, user, weekComics])

    return (
        <div className="flex flex-col flex-1 min-w-full min-h-full bg-gray-600">
            <Head>
                <title>Comics Thingy</title>
                <meta
                    name="A list of all this weeks comic releases"
                    content="Week Page"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />

            <Layout>
                <main className="flex flex-col mb-4 md:w-1/4">
                    <div className="flex flex-row justify-around">
                        <DropDown
                            name="Week"
                            onChange={(val) => {
                                updateCurrentChosenWeek(
                                    parseInt(val.target.value, 10)
                                )
                            }}
                            value={currentChosenWeek}
                        >
                            <option value={0}>Previous Week</option>
                            <option value={1}>Current Week</option>
                            <option value={2}>Next Week</option>
                        </DropDown>

                        <DropDown
                            name="Publisher"
                            value={currentPublisher}
                            onChange={(val) => {
                                updateCurrentPublisher(val.target.value)
                            }}
                        >
                            <option value="ALL">ALL</option>
                            <option value="MARVEL COMICS">Marvel</option>
                            <option value="IMAGE COMICS">Image</option>
                            <option value="DARK HORSE COMICS">
                                Dark Horse
                            </option>
                            <option value="IDW COMICS">IDW</option>
                            {user && <option value="PULL">PULL LIST</option>}
                        </DropDown>
                    </div>
                    <MainButton
                        text="Submit"
                        onClick={() => {
                            getWeeksComics()
                        }}
                        styles="w-3/5 mx-auto mt-4"
                    />
                </main>

                <ComicComponent
                    chosenWeeksComicsFilter={chosenWeeksComicsFilter}
                />
            </Layout>
        </div>
    )
}

export default Home
