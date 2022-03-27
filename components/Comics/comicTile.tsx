/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { usePull } from '../../lib/hooks'

type ComicTileProps = {
    title: string
    img: string
    issue_no: string
}

const ComicTile = (props: ComicTileProps) => {
    const { title, img, issue_no } = props

    const [pullList] = usePull()

    return (
        <div
            className={`flex flex-col h-full text-center bg-gray-800  shadow-gray-900  rounded-md shadow-lg `}
        >
            {pullList.pullList &&
                pullList.pullList.includes(
                    title.toUpperCase().replace('THE ', '')
                ) && (
                    <FaStar
                        className="absolute z-30 text-4xl md:text-5xl"
                        fill="black"
                    />
                )}
            <div className="flex w-5/6 mx-auto mt-6 transition duration-200 hover:cursor-pointer hover:scale-110">
                <Image
                    alt={`${title} #${issue_no}`}
                    height={960}
                    placeholder="blur"
                    blurDataURL={img}
                    width={624}
                    src={img}
                    quality={50}
                />
            </div>
            <p className="p-4 my-3 text-sm text-white md:text-xl md:mt-6">
                {title} {issue_no !== '' ? `#${issue_no}` : ''}
            </p>
        </div>
    )
}

export default ComicTile
