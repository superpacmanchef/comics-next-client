import { useRouter } from 'next/router'
import { useUser } from '../../lib/hooks'
import MainButton from '../elements/mainButton'

const TopNav = () => {
    const router = useRouter()
    const [user, { mutate }] = useUser()

    return (
        <div className="w-full h-16 py-4 flex flex-row items-center justify-items-center shadow-md bg-black z-30 fixed">
            <div className="flex flex-1 mx-4 lg:mx-8 items-center">
                <p className="hover:cursor-pointer w-auto text-2xl text-white">
                    Comics Thingy
                </p>
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
                        text="Collection"
                        onClick={() => {
                            router.push('/collection')
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default TopNav
