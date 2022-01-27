/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image'

const LoadingComicTile = () => {
    return (
        <div className="bg-gray-800 h-full flex flex-col text-center shadow-lg shadow-gray-500 rounded-md">
            <div className="flex mx-auto mt-6 w-5/6 h-full bg-slate-400 animate-pulse rounded-md">
                <Image
                    alt="s"
                    height={960}
                    width={624}
                    src="/dd1.jpg"
                    quality={1}
                    className="opacity-0 rounded-md"
                />
            </div>
            <p className="text-sm md:text-xl my-3 md:mt-6 text-white p-4 rounded-md">
                <p className="w-3/4 mx-auto bg-slate-400 animate-pulse text-opacity-0 rounded-md">
                    <p className="text-opacity-0 text-transparent w-1/2 h-3.5 md:h-5 rounded-md" />
                </p>
            </p>
        </div>
    )
}

export default LoadingComicTile
