/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import { useCollection, usePull, useUser } from '../../lib/hooks'
import addComicToCollection from '../../utils/addComicToCollection'
import addComicToPullList from '../../utils/addComicToPullList'
import removeComicFromCollection from '../../utils/removeComicFromCollection'
import removeComicFromPullList from '../../utils/removeComicFromPullList'
import MainButton from '../elements/mainButton'

type ComicModalProps = {
    comic: Comic_ShortBoxed_SplitTitle_Image | undefined
    displayModal: boolean
    updateDisplayModal: Dispatch<SetStateAction<boolean>>
}

const ComicModal = (props: ComicModalProps) => {
    const { comic, displayModal, updateDisplayModal } = props

    const [user] = useUser()
    const [collection, { collectionMutate }] = useCollection()
    const [pullList, { pullListMutate }] = usePull()

    if (comic !== undefined) {
        return (
            <div
                className={`fixed inset-0 items-center justify-center bg-gray-700 bg-opacity-50 text-white z-50 ${
                    displayModal ? 'flex ' : 'hidden '
                }`}
                onClick={(e) => {
                    e.stopPropagation()
                    updateDisplayModal(false)
                }}
            >
                <div
                    className="flex flex-col w-11/12 p-6 bg-gray-700 divide-y divide-gray-500 rounded-md h-3/4 md:w-3/4"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl">{comic.title}</h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 hover:text-red-600 hover:cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => {
                                updateDisplayModal(false)
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col flex-1 mt-4 overflow-auto md:flex-row ">
                        <div className="flex flex-1 pt-4 ">
                            <div className="w-3/4 p-3 mx-auto md:w-3/5">
                                <Image
                                    height={960}
                                    width={624}
                                    alt={comic.title}
                                    src={comic.image}
                                    quality={50}
                                    className="w-1/3 mx-auto md:w-auto"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 w-11/12 pt-4">
                            <div className="flex flex-col mb-8">
                                <p className="flex text-lg md:text-2xl">
                                    Title
                                </p>
                                <p className="flex text-md md:text-xl">
                                    {comic.title}{' '}
                                    {comic.issue_no ? `#${comic.issue_no}` : ''}
                                </p>
                            </div>
                            <div className="flex flex-col mb-8">
                                <p className="flex text-lg md:text-2xl">
                                    Description
                                </p>
                                <p className="flex text-md md:text-xl">
                                    {comic.description}
                                </p>
                            </div>
                            <div className="flex flex-col mb-8">
                                <p className="flex text-lg md:text-2xl">
                                    Publisher
                                </p>
                                <p className="flex text-md md:text-xl">
                                    {comic.publisher}
                                </p>
                            </div>
                            {comic.creators && (
                                <div className="flex flex-col mb-8">
                                    <p className="flex text-lg md:text-2xl">
                                        Creators
                                    </p>
                                    <p className="flex text-md md:text-xl">
                                        {comic.creators}
                                    </p>
                                </div>
                            )}
                            <div className="flex flex-col mb-8">
                                <p className="flex text-lg md:text-2xl">
                                    Release Date
                                </p>
                                <p className="flex text-md md:text-xl">
                                    {comic.release_date}
                                </p>
                            </div>
                            {user && (
                                <div>
                                    {collection.collection &&
                                    !collection.collection
                                        .map(
                                            (
                                                collectionComic: Comic_ShortBoxed_SplitTitle_Image
                                            ) => {
                                                if (
                                                    collectionComic.diamond_id ===
                                                    comic.diamond_id
                                                ) {
                                                    return true
                                                }
                                                return false
                                            }
                                        )
                                        .some((el: boolean) => el) ? (
                                        <MainButton
                                            styles="my-2 w-full"
                                            text="Add to Collection"
                                            onClick={() => {
                                                addComicToCollection(
                                                    comic,
                                                    collectionMutate
                                                )
                                            }}
                                        />
                                    ) : (
                                        <MainButton
                                            styles="my-2 w-full"
                                            text="Remove From Collection"
                                            onClick={() => {
                                                removeComicFromCollection(
                                                    comic,
                                                    collectionMutate
                                                )
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            {user && (
                                <div>
                                    {pullList.pullList &&
                                    !pullList.pullList.includes(
                                        comic.title.toUpperCase()
                                    ) ? (
                                        <MainButton
                                            styles="my-2 w-full"
                                            text="Add to Pull List"
                                            onClick={() => {
                                                addComicToPullList(
                                                    comic.title,
                                                    pullListMutate
                                                )
                                            }}
                                        />
                                    ) : (
                                        <MainButton
                                            styles="my-2 w-full"
                                            text="Remove From Pull List"
                                            onClick={() => {
                                                removeComicFromPullList(
                                                    comic.title,
                                                    pullListMutate
                                                )
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div />
        </div>
    )
}

export default ComicModal
