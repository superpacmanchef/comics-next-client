/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Image from 'next/image'

type ComicTileProps = {
    title: string
    img: string
    issue_no: string
    updateFocusComic: () => void
}

const ComicTile = (props: ComicTileProps) => {
    const { title, img, issue_no, updateFocusComic } = props
    return (
        <div className="bg-gray-800 h-full flex flex-col text-center shadow-lg shadow-gray-500 rounded-md">
            <div className="flex mx-auto mt-6 w-5/6 hover:cursor-pointer hover:scale-110 transition duration-200">
                <Image
                    alt={`${title} #${issue_no}`}
                    height={960}
                    placeholder="blur"
                    blurDataURL={img}
                    width={624}
                    src={img}
                    onClick={() => {
                        updateFocusComic()
                    }}
                    quality={50}
                />
            </div>
            <p className="text-sm md:text-xl my-3 md:mt-6 text-white p-4">
                {title} {issue_no !== '' ? `#${issue_no}` : ''}
            </p>
        </div>
    )
}

export default ComicTile
