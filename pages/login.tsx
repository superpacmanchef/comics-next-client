/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios'
import { ServerResponse } from 'http'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SetStateAction, useState } from 'react'
import MainButton from '../components/elements/mainButton'
import TextInput from '../components/elements/textInput'
import Layout from '../components/layout'
import TopNav from '../components/Nav/topNav'
import { useCollection, useUser } from '../lib/hooks'
import auth from '../middleware/auth'

// TODO: Theres gotta be a better way to do this?
export async function getServerSideProps(context: any) {
    await auth(context.req, new ServerResponse(context.req))
    if (context.req.isAuthenticated() !== false) {
        return { redirect: { destination: '/', permanent: false } }
    }

    return { props: {} }
}

const Login = () => {
    const [user, { mutate }] = useUser()
    const [collection, { collectionMutate }] = useCollection()

    const [inputUsername, updateInputUsername] = useState('')
    const [inputPassword, updateInputPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const router = useRouter()

    const logUser = async () => {
        const body = {
            username: inputUsername,
            password: inputPassword,
        }
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (res.status === 200) {
            const userObj = await res.json()
            mutate(userObj)
            collectionMutate(userObj.collection)
            router.push('/')
        } else {
            setErrorMsg('Incorrect username or password. Try better!')
            alert(errorMsg)
        }
    }

    return (
        <div className="flex flex-col flex-1 min-h-full">
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
                <div className="z-10 flex flex-col flex-1 w-1/4 p-8 mx-auto bg-gray-400 rounded-md shadow-lg h-1/2 shadow-gray-900 ">
                    <p className="mx-auto mb-4 text-3xl">Log In</p>
                    <div className="my-auto">
                        <div className="flex flex-col mb-8">
                            <TextInput
                                placeholder="Username"
                                value={inputUsername}
                                onChange={(val: any) => {
                                    updateInputUsername(val.target.value)
                                }}
                            />
                        </div>
                        <div className="flex flex-col mb-8">
                            <TextInput
                                passwordFlag
                                value={inputPassword}
                                onChange={(val) => {
                                    updateInputPassword(val.target.value)
                                }}
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex flex-col">
                            <MainButton
                                text="Log In"
                                onClick={() => {
                                    logUser()
                                }}
                                styles="mx-auto w-1/2 shadow shadow-gray-500"
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Login
