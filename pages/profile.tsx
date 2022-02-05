import { ServerResponse } from 'http'
import { FaTrashAlt } from 'react-icons/fa'
import Head from 'next/head'
import { useState } from 'react'
import { Main } from 'next/document'
import ComicComponent from '../components/Comics/comicComponent'
import ButtonSwitch from '../components/elements/buttinSwitch'
import TopNav from '../components/Nav/topNav'
import { useCollection, usePull, useUser } from '../lib/hooks'
import auth from '../middleware/auth'
import removeComicFromPullList from '../utils/removeComicFromPullList'

// TODO: Theres gotta be a better way to do this?
export async function getServerSideProps(context: any) {
    await auth(context.req, new ServerResponse(context.req))
    if (context.req.isAuthenticated() === false) {
        return { redirect: { destination: '/', permanent: false } }
    }

    return { props: {} }
}

const Profile = () => {
    const [user, { loading }] = useUser()
    const [collection, { collectionLoading }] = useCollection()
    const [pullList, { pullListMutate }] = usePull()

    const [pageToShow, updatepageToShow] = useState('Collection')

    return (
        <div className="flex flex-col flex-1 min-w-full min-h-screen">
            <Head>
                <title>Comics Thingy</title>
                <meta name="User Profilenm nn m 8mn" content="Profile Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />

            {!loading && !collectionLoading && (
                <main className="pt-20">
                    <div className="flex flex-1">
                        <p className="mx-auto mb-8 text-3xl">{`${user.username}'s Profile`}</p>
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
