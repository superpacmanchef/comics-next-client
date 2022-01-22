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

const Home: NextPage = () => {
    const [chosenWeeksComics, updateChosenWeeksComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [chosenWeeksComicsFilter, updateChosenWeeksComicsFilter] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [currentChosenWeek, updateCurrentChosenWeek] = useState(1)
    const [lastChosenWeek, updateLastChosenWeek] = useState<number>(1)
    const [currentPublisher, updateCurrentPublisher] = useState('ALL')

    const getWeeksComics = () => {
        if (currentChosenWeek !== lastChosenWeek) {
            updateLastChosenWeek(currentChosenWeek)
            axios
                .get(`/api/weekComics?week=${currentChosenWeek}`)
                .then((res) => {
                    const weekArrayWithImage: Comic_ShortBoxed_SplitTitle_Image[] =
                        res.data.map((comic: Comic_ShortBoxed_SplitTitle) => {
                            return { ...comic, image: null }
                        })

                    updateChosenWeeksComics(weekArrayWithImage)
                    const filteredChosenWeeksComics = filterComicPublishers(
                        weekArrayWithImage,
                        currentPublisher,
                        []
                    )
                    updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
                })
        } else {
            const filteredChosenWeeksComics = filterComicPublishers(
                chosenWeeksComics,
                currentPublisher,
                []
            )

            updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
        }
    }

    useEffect(() => {
        axios.get('/api/weekComics?week=1').then((res) => {
            const weekArrayWithImage: Comic_ShortBoxed_SplitTitle_Image[] =
                res.data.map((comic: Comic_ShortBoxed_SplitTitle) => {
                    return { ...comic, image: null }
                })
            updateChosenWeeksComics(weekArrayWithImage)
            const filteredChosenWeeksComics = filterComicPublishers(
                weekArrayWithImage,
                'ALL',
                []
            )
            updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
        })
    }, [])

    return (
        <div className="h-full flex flex-1 flex-col">
            <Head>
                <title>Comics Thingy</title>
                <meta
                    name="A list of all this weeks comic releases"
                    content="Week Page"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />
            <div className="pt-16 mt-8 flex-1 bg-gray-600">
                <div className="mx-auto md:mx-32">
                    <div className="flex flex-col mb-4 md:w-1/4">
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
                            </DropDown>
                        </div>
                        <MainButton
                            text="Submit"
                            onClick={() => {
                                getWeeksComics()
                            }}
                            styles="w-3/5 mx-auto mt-4"
                        />
                    </div>

                    <ComicComponent
                        chosenWeeksComicsFilter={chosenWeeksComicsFilter}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
