/* eslint-disable jsx-a11y/label-has-associated-control */
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ComicGrid from '../components/Comics/comicGrid'
import TopNav from '../components/Nav/topNav'
import MainButton from '../components/elements/mainButton'
import filterComicPublishers from '../utils/filterComicPublishers'
import DropDown from '../components/elements/dropDown'

const Home: NextPage = () => {
    const [chosenWeeksComics, updateChosenWeeksComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [chosenWeeksComicsFilter, updateChosenWeeksComicsFilter] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [currentChosenWeek, updateCurrentChosenWeek] = useState(1)
    const [lastChosenWeek, updateLastChosenWeek] = useState<number>()
    const [currentPageComics, updateCurrentPageComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [currentPage, updateCurrentPage] = useState(0)
    const [currentTotalPageNo, updateCurrentTotalPageNo] = useState(1)
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
                    updateCurrentTotalPageNo(
                        Math.ceil(filteredChosenWeeksComics.length / 10)
                    )
                    updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
                })
        } else {
            const filteredChosenWeeksComics = filterComicPublishers(
                chosenWeeksComics,
                currentPublisher,
                []
            )
            updateCurrentTotalPageNo(
                Math.ceil(filteredChosenWeeksComics.length / 10)
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
            updateCurrentTotalPageNo(Math.ceil(weekArrayWithImage.length / 10))
            updateChosenWeeksComics(weekArrayWithImage)
            const filteredChosenWeeksComics = filterComicPublishers(
                weekArrayWithImage,
                currentPublisher,
                []
            )
            updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const noPerPage = 10
        const subArray = chosenWeeksComicsFilter.slice(
            currentPage * noPerPage,
            currentPage * noPerPage + noPerPage
        )

        const currentPageMetron = subArray.flatMap((comic) => {
            if (comic.image === null) {
                return axios
                    .post('/api/pageComics', { comic })
                    .then((res) => res.data)
            }
            return comic.image
        })

        Promise.all(currentPageMetron).then((comics) => {
            const imageComics = subArray.map((comic, index) => {
                // eslint-disable-next-line no-param-reassign
                comic.image = comics[index]
                return comic
            })

            updateCurrentPageComics(imageComics)
        })
    }, [chosenWeeksComics, currentPage, chosenWeeksComicsFilter])

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

                    <div className="flex flex-col">
                        <DropDown
                            onChange={(val) => {
                                updateCurrentPage(
                                    parseInt(val.target.value, 10)
                                )
                            }}
                            value={currentPage}
                            name="Current Page"
                        >
                            {[...Array(currentTotalPageNo)].map((e, i) => {
                                return <option value={i}>{i + 1}</option>
                            })}
                        </DropDown>
                        <div className="flex flex-1 flex-row mx-auto">
                            <MainButton
                                text="Prev"
                                onClick={() => {
                                    if (currentPage > 0) {
                                        updateCurrentPage(currentPage - 1)
                                    }
                                }}
                                styles="px-16 mx-4"
                            />
                            <MainButton
                                text="Next"
                                onClick={() => {
                                    if (
                                        currentPage !==
                                        currentTotalPageNo - 1
                                    ) {
                                        updateCurrentPage(currentPage + 1)
                                    }
                                }}
                                styles="px-16 mx-4"
                            />
                        </div>
                    </div>

                    <ComicGrid comics={currentPageComics} />
                </div>
            </div>
        </div>
    )
}

export default Home
