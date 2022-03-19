import { useRouter } from 'next/router'
import { useUser } from '../../lib/hooks'
import MainButton from '../elements/mainButton'

const TopNav = () => {
    const router = useRouter()
    const [user] = useUser()

    return (
        <div className="fixed z-40 flex flex-row items-center w-full h-16 px-1 py-4 bg-gray-800 shadow-md md:px-4 justify-items-center">
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
                    <MainButton
                        text="Login"
                        onClick={() => {
                            router.push('/login')
                        }}
                    />
                </div>
            ) : (
                <div className="flex mx-4 lg:mx-8">
                    <MainButton
                        text="Profile"
                        onClick={() => {
                            router.push('/profile')
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default TopNav
