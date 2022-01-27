import { Db, MongoClient, ObjectId } from 'mongodb'

class DAO {
    db!: Db

    constructor() {
        console.log(process.env.MONGO_LINK, 'bunms')
        if (process.env.MONGO_LINK) {
            const connectionString = process.env.MONGO_LINK
            // eslint-disable-next-line consistent-return
            MongoClient.connect(connectionString, (err, client) => {
                if (err || client === undefined) return console.error(err)
                console.log('Connected to Database')
                this.db = client.db('comic-react-server')
            })
        } else {
            throw new Error('NO ENV')
        }
    }

    insertUser(username: string, email: string, password: string) {
        this.db.collection('users').insertOne({
            username,
            email,
            password,
            pullList: [],
            collection: [],
        })
    }

    insertCollection(id: string, comic: Comic_ShortBoxed_SplitTitle_Image) {
        return new Promise((resolve, reject) => {
            this.checkCollection(
                id,
                comic.title,
                comic.issue_no,
                comic.diamond_id,
                comic.diamond_id
            ).then((res) => {
                if (res === 1) {
                    this.db.collection('users').updateOne(
                        { _id: id },
                        {
                            $push: { collection: comic },
                        }
                    )
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    removeCollection(id: string, comicName: string, comicIssue: string) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').updateOne(
                { _id: id },
                {
                    $pull: {
                        collection: {
                            title: comicName,
                            issue_number: comicIssue,
                        },
                    },
                }
            )
            resolve(true)
        })
    }

    removePull(id: string, comicname: string) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').updateOne(
                { _id: id },
                {
                    $pull: {
                        pullList: comicname,
                    },
                }
            )
            resolve(true)
        })
    }

    searchByUsername(username: string) {
        return this.db
            .collection('users')
            .findOne({ username })
            .then((entries) => {
                return entries
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

    searchByID(id: string) {
        return this.db
            .collection('users')
            .findOne({ _id: new ObjectId(id) })
            .then((entries) => {
                return entries
            })
            .catch((err) => console.log(err))
    }

    insertPull(id: string, comic: Comic_ShortBoxed_SplitTitle_Image) {
        return new Promise((resolve, reject) => {
            this.db
                .collection('users')
                .updateOne(
                    { _id: new ObjectId(id) },
                    { $push: { pullList: comic } },
                    {},
                    function () {
                        resolve(true)
                    }
                )
        })
    }

    getPull(id: string) {
        return new Promise((resolve, reject) => {
            this.db
                .collection('users')
                .findOne(
                    { _id: new ObjectId(id) },
                    { projection: { pullList: 1 } }
                )
                .then((res) => {
                    if (res === null) {
                        resolve([])
                    } else {
                        resolve(res.pullList)
                    }
                })
        })
    }

    getUsername(id: string) {
        return new Promise((resolve, reject) => {
            this.db
                .collection('users')
                .findOne(
                    { _id: new ObjectId(id) },
                    { projection: { username: 1 } }
                )
                .then((res) => {
                    if (res === null) {
                        resolve('')
                    } else {
                        resolve(res.username)
                    }
                })
        })
    }

    getCollection(id: string) {
        return new Promise((resolve, reject) => {
            this.db
                .collection('users')
                .findOne(
                    { _id: new ObjectId(id) },
                    { projection: { collection: 1 } }
                )
                .then((res) => {
                    if (res === null) {
                        resolve([])
                    } else {
                        resolve(res.collection)
                    }
                })
        })
    }

    // TODO : Make this less of a mess
    checkCollection(
        id: string,
        comic: string,
        issue: string,
        comicID: string,
        comicDID: string
    ) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.getCollection(id).then((collection: any) => {
                let col = 1
                if (collection) {
                    for (let x = 0; x < collection.length; x++) {
                        if (comic) {
                            if (col === 3) {
                                break
                            }
                            if (
                                collection[x].title
                                    .toUpperCase()
                                    .replace(/[.,#!$%^&*;:{}=_`~()]/g, '')
                                    .replace(/AND /g, '')
                                    .includes(comic.toUpperCase()) &&
                                collection[x].issue_no === `#${issue}` &&
                                comic
                            ) {
                                col = 3
                            } else if (comicID) {
                                if (collection[x].diamond_id === comicID) {
                                    col = 3
                                }
                            } else if (comicDID) {
                                if (collection[x].diamond_id === comicDID) {
                                    col = 3
                                }
                            }
                        } else {
                            col = 0
                        }
                    }
                    resolve(col)
                } else {
                    resolve(1)
                }
            })
        })
    }

    checkPullList(id: string, comic: string) {
        return new Promise((resolve, reject) => {
            this.getPull(id).then((pullList: any) => {
                let pul = 2
                for (let x = 0; x < pullList.length; x++) {
                    if (comic) {
                        if (
                            pullList[x]
                                .toUpperCase()
                                .replace(/[.,#!$%^&*;:{}=_`~()]/g, '')
                                .replace(/AND /g, '')
                                .replace(/THE /g, '') ===
                            comic.replace(/THE /g, '')
                        ) {
                            pul = 4
                        }
                    } else {
                        pul = 0
                    }
                }
                resolve(pul)
            })
        })
    }

    getCollectionComicByID(id: string, colID: string) {
        return new Promise((resolve, reject) => {
            this.getCollection(id).then((collection: any) => {
                let exist = false
                collection.forEach((col: Comic_ShortBoxed_SplitTitle_Image) => {
                    if (col.diamond_id === colID) {
                        exist = true
                    }
                })
                resolve(exist)
            })
        })
    }
}
const dao = new DAO()

export default dao
