/* eslint-disable react/jsx-no-useless-fragment */
import { ServerResponse } from 'http'
import { FaTrashAlt } from 'react-icons/fa'
import Head from 'next/head'
import { useState } from 'react'
import ComicComponent from '../components/Comics/comicComponent'
import ButtonSwitch from '../components/elements/buttinSwitch'
import TopNav from '../components/Nav/topNav'
import { useCollection, usePull, useUser } from '../lib/hooks'
import auth from '../middleware/auth'
import removeComicFromPullList from '../utils/removeComicFromPullList'
import Layout from '../components/layout'

// TODO: Theres gotta be a better way to do this?
export async function getServerSideProps(context: any) {
    await auth(context.req, new ServerResponse(context.req))
    if (context.req.isAuthenticated() === false) {
        return { redirect: { destination: '/', permanent: false } }
    }

    return { props: {} }
}

const Profile = () => {
    const [user, { mutate, loading }] = useUser()
    const [collection, { collectionMutate, collectionLoading }] =
        useCollection()
    const [pullList, { pullListMutate, pullListLoading }] = usePull()

    const [pageToShow, updatepageToShow] = useState('Collection')

    return (
        <div className="flex flex-col flex-1 min-h-screen">
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
                {!loading && !collectionLoading ? (
                    <div>
                        <div className="flex flex-1">
                            <p className="mx-auto mb-8 text-3xl">{`${user.username}'s Profile`}</p>
                        </div>
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
                        <div className="h-full">
                            {pageToShow === 'Collection' &&
                            collection.collection ? (
                                <div>
                                    <ComicComponent
                                        chosenWeeksComicsFilter={
                                            collection.collection
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center flex-1">
                                    {pullList.pullList.map(
                                        (comicTitle: string) => (
                                            <div className="flex flex-row justify-center flex-1 mx-auto">
                                                <p className="my-2 text-3xl text-left text-white">
                                                    {comicTitle}
                                                </p>
                                                <FaTrashAlt
                                                    size={30}
                                                    className="my-auto msl-8 hover:text-red-600 hover:cursor-pointer"
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
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </Layout>
        </div>
    )
}

export default Profile
