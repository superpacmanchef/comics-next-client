/* eslint-disable jsx-a11y/label-has-associated-control */
import { ServerResponse } from 'http'
import Head from 'next/head'
import { useRouter } from 'next/router'
import passport from 'passport'
import { useState } from 'react'
import ButtonSwitch from '../components/elements/buttinSwitch'
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
    const [inputEmail, updateInputEmail] = useState('')
    const [inputPasswordRepeat, updateInputPasswordRepeat] = useState('')

    const [toDisplay, updateToDisplay] = useState('Login')

    const router = useRouter()

    const logUser = async () => {
        const body = {
            username: inputEmail,
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
            alert('Incorrect username or password.')
        }
    }

    const regUser = async () => {
        if (inputPassword !== inputPasswordRepeat) {
            alert('Passwords dont match')
        } else {
            const body = {
                username: inputUsername,
                email: inputEmail,
                password: inputPassword,
                passwordRepeat: inputPasswordRepeat,
            }
            const res = await fetch('/api/userHandler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const json = await res.json()

            if (res.status !== 200 || !json.success) {
                alert('SUMINIT WENT WRONG')
            }
        }
    }

    return (
        <div className="flex flex-col flex-1 min-h-full">
            <Head>
                <title>Comics Thingy</title>
                <meta
                    name="Login To add comics to collection "
                    content="Login"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />
            <Layout>
                <ButtonSwitch
                    button1Text="Login"
                    button2Text="Register"
                    button1Func={() => {
                        updateToDisplay('Login')
                    }}
                    button2Func={() => {
                        updateToDisplay('Register')
                    }}
                />
                <main className="z-10 flex flex-col flex-1 w-full p-8 mx-auto bg-gray-400 rounded-md shadow-lg md:w-1/4 h-1/2 shadow-gray-900 ">
                    {toDisplay === 'Login' ? (
                        <>
                            <p className="mx-auto mb-4 text-3xl">Log In</p>
                            <div className="my-auto">
                                <div className="flex flex-col mb-8">
                                    <TextInput
                                        placeholder="Email"
                                        value={inputEmail}
                                        onChange={(val) => {
                                            updateInputEmail(val.target.value)
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col mb-8">
                                    <TextInput
                                        passwordFlag
                                        value={inputPassword}
                                        onChange={(val) => {
                                            updateInputPassword(
                                                val.target.value
                                            )
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
                        </>
                    ) : (
                        <>
                            {' '}
                            <p className="mx-auto mb-4 text-3xl">Register</p>
                            <div className="my-auto">
                                <div className="flex flex-col mb-8">
                                    <TextInput
                                        placeholder="Username"
                                        value={inputUsername}
                                        onChange={(val) => {
                                            updateInputUsername(
                                                val.target.value
                                            )
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col mb-8">
                                    <TextInput
                                        value={inputEmail}
                                        onChange={(val) => {
                                            updateInputEmail(val.target.value)
                                        }}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="flex flex-col mb-8">
                                    <TextInput
                                        passwordFlag
                                        value={inputPassword}
                                        onChange={(val) => {
                                            updateInputPassword(
                                                val.target.value
                                            )
                                        }}
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="flex flex-col mb-8">
                                    <TextInput
                                        passwordFlag
                                        value={inputPasswordRepeat}
                                        onChange={(val) => {
                                            updateInputPasswordRepeat(
                                                val.target.value
                                            )
                                        }}
                                        placeholder="Passwsord Repeat"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <MainButton
                                        text="Register"
                                        onClick={() => {
                                            regUser()
                                        }}
                                        styles="mx-auto w-1/2 shadow shadow-gray-500"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </Layout>
        </div>
    )
}

export default Login
