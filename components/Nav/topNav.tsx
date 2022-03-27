import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCollection, usePull, useUser } from '../../lib/hooks'
import MainButton from '../elements/mainButton'

const TopNav = () => {
    const router = useRouter()
    const [user, { mutate }] = useUser()
    const [collection, { collectionMutate }] = useCollection()
    const [pullList, { pullListMutate }] = usePull()

    const logOut = async () => {
        await axios.post('/api/logout')
        mutate(null)
        collectionMutate([])
        pullListMutate([])

        router.push('/')
    }

    return (
        <nav className="fixed z-40 flex flex-row items-center w-full h-16 px-1 py-4 bg-gray-800 shadow-md md:px-4 justify-items-center">
            <div className="flex items-center flex-1 mx-4 lg:mx-8">
                <div
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                        router.push('/')
                    }}
                    onKeyPress={() => {
                        router.push('/')
                    }}
                    className="w-auto text-2xl text-white hover:cursor-pointer"
                >
                    <p>Comics Thingy</p>
                </div>
            </div>
            {!user ? (
                <div className="flex mx-4 lg:mx-8">
                    <MainButton>
                        <Link href="/login">Login</Link>
                    </MainButton>
                </div>
            ) : (
                <div className="flex mx-4 space-x-4 lg:mx-8">
                    <MainButton>
                        <Link href="/profile">Profile</Link>
                    </MainButton>

                    <MainButton
                        onClick={() => {
                            logOut()
                        }}
                    >
                        Log Out
                    </MainButton>
                </div>
            )}
        </nav>
    )
}

export default TopNav
