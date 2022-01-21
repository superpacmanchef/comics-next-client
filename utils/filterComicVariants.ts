// Filters out variants and trades and returns.
export default (comics: { data: { comics: Comic_ShortBoxed[] } }) => {
    const filteredComics: Comic_ShortBoxed[] = []
    comics.data.comics.forEach((comic) => {
        if (
            comic.title.includes(' VAR') ||
            comic.title.includes(' CVR') ||
            comic.title.includes(' TP') ||
            comic.title.includes(' VOL') ||
            comic.title.includes(' OMNIBUS') ||
            comic.title.includes('COPY') ||
            comic.title.includes(' HC') ||
            comic.title.includes(' LTD ED') ||
            comic.title.includes(' COVER') ||
            comic.title.includes(' GN') ||
            comic.title.includes(' CV') ||
            comic.title.includes(' VA') ||
            comic.title.includes(' PTG') ||
            comic.title.includes(' PROG') ||
            comic.title.includes(' V')
            // eslint-disable-next-line no-empty
        ) {
        } else {
            filteredComics.push(comic)
        }
    })
    return filteredComics
}
