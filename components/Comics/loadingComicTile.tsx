/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image'

const LoadingComicTile = () => {
    return (
        <div className="flex flex-col h-full text-center bg-gray-800 rounded-md shadow-lg shadow-gray-500">
            <div className="flex w-5/6 h-full mx-auto mt-6 rounded-md bg-slate-400 animate-pulse">
                <Image
                    alt="Loading Comic Tile"
                    height={960}
                    width={624}
                    src="/dd1.jpg"
                    quality={1}
                    className="rounded-md opacity-0"
                />
            </div>
            <p className="p-4 my-3 text-sm text-white rounded-md md:text-xl md:mt-6">
                <p className="w-3/4 mx-auto text-opacity-0 rounded-md bg-slate-400 animate-pulse">
                    <p className="text-opacity-0 text-transparent w-1/2 h-3.5 md:h-5 rounded-md" />
                </p>
            </p>
        </div>
    )
}

export default LoadingComicTile
