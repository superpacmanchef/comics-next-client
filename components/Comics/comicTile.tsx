/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Image from 'next/image'

type ComicTileProps = {
    title: string
    img?: string
    issue_no: string
    updateFocusComic: () => void
}

const ComicTile = (props: ComicTileProps) => {
    const {
        title,
        img = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1602236%2Fgoogle.jpg&f=1&nofb=1',
        issue_no,
        updateFocusComic,
    } = props

    let img2 = img

    if (img === null || img === 'null') {
        console.log(img)
        img2 =
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1602236%2Fgoogle.jpg&f=1&nofb=1'
    }

    return (
        <div className="flex flex-col h-full text-center bg-gray-800 rounded-md shadow-lg shadow-gray-500">
            <div className="flex w-5/6 mx-auto mt-6 transition duration-200 hover:cursor-pointer hover:scale-110">
                <Image
                    alt={`${title} #${issue_no}`}
                    height={960}
                    placeholder="blur"
                    blurDataURL={img2}
                    width={624}
                    src={img2}
                    onClick={() => {
                        updateFocusComic()
                    }}
                    quality={50}
                />
            </div>
            <p className="p-4 my-3 text-sm text-white md:text-xl md:mt-6">
                {title} {issue_no !== '' ? `#${issue_no}` : ''}
            </p>
        </div>
    )
}

ComicTile.defaultProps = {
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1602236%2Fgoogle.jpg&f=1&nofb=1',
}

export default ComicTile
