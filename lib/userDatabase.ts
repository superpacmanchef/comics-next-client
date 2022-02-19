import { MongoClient, ObjectId } from 'mongodb'

const connect = async () => {
    if (process.env.MONGO_LINK) {
        const connectionString =
            'mongodb+srv://dbUser:urvh9VL5438WcirF@comicsreactserver.hgt2s.mongodb.net/ComicsReactServer?retryWrites=true&w=majority'
        // eslint-disable-next-line consistent-return
        const client = await MongoClient.connect(connectionString)
        return client.db('comic-react-server')
    }
    throw new Error('NO ENV')
}

const db = await connect()

export default db

const searchByID = (id: string) => {
    return db
        .collection('users')
        .findOne({ _id: new ObjectId(id) })
        .then((entries) => {
            return entries
        })
        .catch((err) => {
            console.log(err)
            return null
        })
}

export const insertUser = (
    username: string,
    email: string,
    password: string
) => {
    db.collection('users').insertOne({
        username,
        email,
        password,
        pullList: [],
        collection: [],
    })
}

export const insertCollection = async (
    id: string,
    comic: Comic_ShortBoxed_SplitTitle_Image
) => {
    try {
        const user = await searchByID(id)
        if (user) {
            const inCol = !user.collection
                .map((collectionComic: Comic_ShortBoxed_SplitTitle_Image) => {
                    if (collectionComic.diamond_id === comic.diamond_id) {
                        return true
                    }
                    return false
                })
                .some((el: boolean) => el)

            if (inCol) {
                await db.collection('users').updateOne(
                    { _id: id },
                    {
                        $push: { collection: comic },
                    }
                )
                const newUser = await searchByID(id)
                if (newUser) {
                    return newUser.collection
                }
                return false
            }
            return user.collection
        }
        return false
    } catch (err) {
        console.log(err)
        return false
    }
}

export const removeCollection = async (id: string, diamond_id: string) => {
    try {
        await db.collection('users').updateOne(
            { _id: id },
            {
                $pull: {
                    collection: {
                        diamond_id,
                    },
                },
            }
        )
        const user = await searchByID(id)
        if (user !== null) {
            return user.collection
        }
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

export const removePull = async (id: string, comicname: string) => {
    try {
        await db.collection('users').updateOne(
            { _id: id },
            {
                $pull: {
                    pullList: comicname,
                },
            }
        )
        const user = await searchByID(id)
        if (user) {
            return user.pullList
        }
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

export const searchByEmail = (username: string) => {
    return db
        .collection('users')
        .findOne({ email: username })
        .then((entries) => {
            return entries
        })
        .catch((err) => {
            console.log(err)
            return null
        })
}

export const insertPull = async (id: string, comic: string) => {
    try {
        await db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(id) },
                { $push: { pullList: comic } },
                {}
            )
        const user = await searchByID(id)
        if (user) {
            return user.pullList
        }
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

// getPull(id: string) {
//     return new Promise((resolve, reject) => {
//         this.db
//             .collection('users')
//             .findOne(
//                 { _id: new ObjectId(id) },
//                 { projection: { pullList: 1 } }
//             )
//             .then((res) => {
//                 if (res === null) {
//                     resolve([])
//                 } else {
//                     resolve(res.pullList)
//                 }
//             })
//     })
// }

// getUsername(id: string) {
//     return new Promise((resolve, reject) => {
//         this.db
//             .collection('users')
//             .findOne(
//                 { _id: new ObjectId(id) },
//                 { projection: { username: 1 } }
//             )
//             .then((res) => {
//                 if (res === null) {
//                     resolve('')
//                 } else {
//                     resolve(res.username)
//                 }
//             })
//     })
// }

// getCollection(id: string) {
//     return new Promise((resolve, reject) => {
//         this.db
//             .collection('users')
//             .findOne(
//                 { _id: new ObjectId(id) },
//                 { projection: { collection: 1 } }
//             )
//             .then((res) => {
//                 if (res === null) {
//                     resolve([])
//                 } else {
//                     resolve(res.collection)
//                 }
//             })
//     })
// }

// // TODO : Make this less of a mess
// checkCollection(
//     id: string,
//     comic: string,
//     issue: string,
//     comicID: string,
//     comicDID: string
// ) {
//     return new Promise((resolve, reject) => {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         this.getCollection(id).then((collection: any) => {
//             let col = 1
//             if (collection) {
//                 for (let x = 0; x < collection.length; x++) {
//                     if (comic) {
//                         if (col === 3) {
//                             break
//                         }
//                         if (
//                             collection[x].title
//                                 .toUpperCase()
//                                 .replace(/[.,#!$%^&*;:{}=_`~()]/g, '')
//                                 .replace(/AND /g, '')
//                                 .includes(comic.toUpperCase()) &&
//                             collection[x].issue_no === `#${issue}` &&
//                             comic
//                         ) {
//                             col = 3
//                         } else if (comicID) {
//                             if (collection[x].diamond_id === comicID) {
//                                 col = 3
//                             }
//                         } else if (comicDID) {
//                             if (collection[x].diamond_id === comicDID) {
//                                 col = 3
//                             }
//                         }
//                     } else {
//                         col = 0
//                     }
//                 }
//                 resolve(col)
//             } else {
//                 resolve(1)
//             }
//         })
//     })
// }

// checkPullList(id: string, comic: string) {
//     return new Promise((resolve, reject) => {
//         this.getPull(id).then((pullList: any) => {
//             let pul = 2
//             for (let x = 0; x < pullList.length; x++) {
//                 if (comic) {
//                     if (
//                         pullList[x]
//                             .toUpperCase()
//                             .replace(/[.,#!$%^&*;:{}=_`~()]/g, '')
//                             .replace(/AND /g, '')
//                             .replace(/THE /g, '') ===
//                         comic.replace(/THE /g, '')
//                     ) {
//                         pul = 4
//                     }
//                 } else {
//                     pul = 0
//                 }
//             }
//             resolve(pul)
//         })
//     })
// }

// getCollectionComicByID(id: string, colID: string) {
//     return new Promise((resolve, reject) => {
//         this.getCollection(id).then((collection: any) => {
//             let exist = false
//             collection.forEach((col: Comic_ShortBoxed_SplitTitle_Image) => {
//                 if (col.diamond_id === colID) {
//                     exist = true
//                 }
//             })
//             resolve(exist)
//         })
//     })
// }
