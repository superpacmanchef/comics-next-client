import { IncomingMessage, ServerResponse } from 'http'
import { FaTrashAlt } from 'react-icons/fa'
import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import ComicComponent from '../components/Comics/comicComponent'
import ButtonSwitch from '../components/elements/buttinSwitch'
import TopNav from '../components/Nav/topNav'
import { useCollection, usePull, useUser } from '../lib/hooks'
import auth from '../middleware/auth'
import removeComicFromPullList from '../utils/removeComicFromPullList'
import MainButton from '../components/elements/mainButton'
import TextInput from '../components/elements/textInput'
import addComicToCollection from '../utils/addComicToCollection'

// TODO: Theres gotta be a better way to do this?
export async function getServerSideProps(context: any) {
    await auth(context.req, new ServerResponse(context.req))
    if (context.req.isUnauthenticated()) {
        return { redirect: { destination: '/', permanent: false } }
    }
    return { props: {} }
}

const AddComicModal = (props: any) => {
    const { displayModal, updateDisplayModal } = props

    const [addComicTitle, updateAddComicTitle] = useState('')
    const [addComicIssueNumber, updateAddComicIssueNumber] = useState('')
    const [addComicDate, updateAddComicDate] = useState<Date | null>(null)
    const [addComicID, updateAddComicID] = useState('')
    const [addComicUPC, updateAddComicUPC] = useState('')

    const [collection, { collectionMutate }] = useCollection()

    const searchComic = async () => {
        if (addComicUPC !== '' && addComicUPC.length < 17) {
            alert('UPC code length < 17')
            return
        }

        let upcCopy = addComicUPC.slice(0, addComicUPC.length - 5)
        if (addComicUPC) {
            const t = 3 - addComicIssueNumber.length
            let y = `11`

            if (t === 2) {
                y = `00${addComicIssueNumber}${y}`
            } else {
                y = `0${addComicIssueNumber}${y}`
            }

            upcCopy += y
        }

        let coverMonth = ''
        let coverYear = ''

        if (addComicDate) {
            coverMonth = `${addComicDate.getMonth() + 1}`
            coverYear = `${addComicDate.getFullYear()}`
        }

        try {
            const data = await axios.post('/api/comicSearchHandler', {
                comicTitle: addComicTitle,
                comicIssueNumber: addComicIssueNumber,
                comicMonth: coverMonth,
                comicYear: coverYear,
                comicID: addComicID,
                comicUPC: upcCopy,
            })

            if (data.data === '') {
                alert('Something went Wrong. Try adding more fields')
            } else {
                await addComicToCollection(data.data, collectionMutate)
                updateAddComicID('')
                updateAddComicUPC('')
                updateAddComicDate(new Date())
                updateAddComicIssueNumber('')
                updateAddComicTitle('')
                updateDisplayModal(false)
            }
        } catch (err) {
            console.log(err)

            alert('Something went Wrong. Try adding more fields')
        }
    }

    return (
        <div
            tabIndex={-5}
            role="button"
            className={`fixed inset-0 items-center justify-center bg-gray-700 bg-opacity-50 text-white z-50 ${
                displayModal ? 'flex ' : 'hidden '
            }`}
            onClick={(e) => {
                e.stopPropagation()
                updateDisplayModal(false)
            }}
            onKeyPress={(e) => {
                e.stopPropagation()
                updateDisplayModal(false)
            }}
        >
            <div
                tabIndex={-5}
                role="button"
                className="flex flex-col w-11/12 p-6 bg-gray-700 divide-y divide-gray-500 rounded-md h-3/4 md:w-1/4"
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onKeyPress={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl">Add Comic To Collection</h3>
                    <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 hover:text-red-600 hover:cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => {
                            updateDisplayModal(false)
                        }}
                        onKeyPress={() => {
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
                    <div className="flex flex-row flex-1 pt-4">
                        <div className="mx-auto text-black">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <div className="mb-2 md:mb-8">
                                    <p>Comic Title</p>
                                    <TextInput
                                        placeholder="Amazing Spider-Man *"
                                        value={addComicTitle}
                                        onChange={(val) => {
                                            updateAddComicTitle(
                                                val.target.value
                                            )
                                        }}
                                        requiredFlag
                                    />
                                </div>
                                <div className="mb-2 md:mb-8">
                                    <p>Comic Issue Number</p>
                                    <TextInput
                                        placeholder="7 *"
                                        value={addComicIssueNumber}
                                        onChange={(val) => {
                                            updateAddComicIssueNumber(
                                                val.target.value
                                            )
                                        }}
                                        requiredFlag
                                    />
                                </div>
                                <div className="mb-2 md:mb-8">
                                    <p>Release Date</p>
                                    <input
                                        className="w-full h-12 p-2 mx-auto border border-gray-700 rounded-md shadow-inner shadow-gray-300"
                                        type="month"
                                        onChange={(val) => {
                                            updateAddComicDate(
                                                val.target.valueAsDate
                                            )
                                        }}
                                    />
                                </div>
                                <div className="mb-2 md:mb-8">
                                    <p>Diamond ID</p>
                                    <TextInput
                                        placeholder="MAR70865"
                                        value={addComicID}
                                        onChange={(val) => {
                                            updateAddComicID(val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="mb-3 md:mb-8">
                                    <p>UPC Code</p>
                                    <TextInput
                                        placeholder="12345678901011"
                                        value={addComicUPC}
                                        onChange={(val) => {
                                            updateAddComicUPC(val.target.value)
                                        }}
                                    />
                                </div>
                                <MainButton
                                    text="Add Comic"
                                    onClick={() => {
                                        searchComic()
                                    }}
                                    styles="w-full"
                                    submitFlag
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Profile = () => {
    const [user, { loading }] = useUser()
    const [collection, { collectionLoading }] = useCollection()
    const [pullList, { pullListMutate }] = usePull()

    const [pageToShow, updatepageToShow] = useState('Collection')
    const [displayModal, updateDisplayModal] = useState(false)

    return (
        <div className="flex flex-col flex-1 min-w-full min-h-screen">
            <Head>
                <title>Comics Thingy</title>
                <meta name="User Profile" content="Profile Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />

            {!loading && !collectionLoading && (
                <main className="pt-20">
                    <div className="flex flex-1">
                        <p className="mx-auto mb-8 text-3xl text-white">{`${user.username}'s Profile`}</p>
                    </div>
                    <div className="w-5/6 mx-auto">
                        <ButtonSwitch
                            button1Text="Collection"
                            button2Text="PullList"
                            button1Func={() => {
                                updatepageToShow('Collection')
                            }}
                            button2Func={() => {
                                updatepageToShow('PullList')
                            }}
                        />
                    </div>
                    <div className="h-full">
                        {pageToShow === 'Collection' &&
                        collection.collection ? (
                            <div className="mx-auto mt-8 md:mx-32">
                                <div className="flex flex-col mb-6">
                                    <MainButton
                                        text="Add Button To Collection"
                                        styles="mx-auto justify-center"
                                        onClick={() => {
                                            updateDisplayModal(true)
                                        }}
                                    />
                                </div>
                                <AddComicModal
                                    displayModal={displayModal}
                                    updateDisplayModal={updateDisplayModal}
                                />
                                <div className="flex flex-col justify-center flex-1">
                                    <ComicComponent
                                        chosenWeeksComicsFilter={
                                            collection.collection
                                        }
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="mx-auto mt-8 md:mx-32">
                                <div className="flex flex-col justify-center flex-1 mb-8">
                                    {pullList.pullList.map(
                                        (comicTitle: string) => (
                                            <div className="flex flex-row justify-center flex-1 w-5/6 mx-auto my-2 text-justify md:w-1/3 w-8/10">
                                                <p className="flex-1 w-full my-2 text-xl text-white md:text-3xl">
                                                    {comicTitle}
                                                </p>
                                                <FaTrashAlt
                                                    className="flex my-auto ml-8 text-3xl msl-8 hover:text-red-600 hover:cursor-pointer"
                                                    onClick={() => {
                                                        removeComicFromPullList(
                                                            comicTitle,
                                                            pullListMutate
                                                        )
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            )}
        </div>
    )
}

export default Profile
