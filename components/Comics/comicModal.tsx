/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'

type ComicModalProps = {
    comic: Comic_ShortBoxed_SplitTitle_Image | undefined
    displayModal: boolean
    updateDisplayModal: Dispatch<SetStateAction<boolean>>
}

const ComicModal = (props: ComicModalProps) => {
    const { comic, displayModal, updateDisplayModal } = props

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
                onKeyPress={() => {
                    updateDisplayModal(false)
                }}
            >
                <div
                    className="flex flex-col p-6 bg-gray-700 h-3/4 w-11/12 md:w-3/4 divide-y divide-gray-500 rounded-md"
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
                    <div className="flex flex-1 flex-col md:flex-row  mt-4 overflow-auto ">
                        <div className="flex flex-1 pt-4 ">
                            <div className="mx-auto w-3/4 md:w-3/5 p-3">
                                <Image
                                    height={960}
                                    width={624}
                                    alt={comic.title}
                                    src={comic.image}
                                    quality={50}
                                    className="mx-auto w-1/3 md:w-auto"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 pt-4 w-11/12">
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
