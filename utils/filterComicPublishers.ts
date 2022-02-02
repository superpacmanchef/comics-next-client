// Filters out comics based on publisher state and returns.
export default (
    comics: Comic_ShortBoxed_SplitTitle_Image[],
    publisher: any,
    pull: string[]
): Comic_ShortBoxed_SplitTitle_Image[] => {
    if (publisher === 'ALL') {
        return comics
    }
    // if (publisher === 'PULL') {
    //     const f: ComicsType[] = []
    //     comics.forEach((comic: any) => {
    //         for (let x = 0; x < pull.length; x += x + 1) {
    //             const comicTitle = comic.title
    //                 .replace(/THE /g, '')
    //                 .replace(/AND /g, '')

    //             const strippedPull = pull[x]
    //                 .toUpperCase()
    //                 .replace(/[.,#!$%&;:{}=`~()]/g, '')
    //                 .replace(/AND /g, '')
    //                 .replace(/THE /g, '')

    //             const [name] = comicTitleSplit(comicTitle)
    //             if (strippedPull === name) {
    //                 f.push(comic)
    //             }
    //         }
    //     })
    //     return f
    // }
    const f = comics.filter((comic) => comic.publisher === publisher)

    return f
}
