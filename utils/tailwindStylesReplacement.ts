const tailwindStyleReplacment = (classes: string, newClasses: string) => {
    let y = 0
    const prefixes = []
    const styles = []

    for (let x = 0; x < classes.length; x++) {
        if (classes[x] === ' ') {
            y = x + 1
        } else if (classes[x] === ':' || classes[x] === '-') {
            const prefix = classes.substring(y, x)
            prefixes.push(prefix)
            while (classes[x] === ' ' || x >= classes.length) {
                x += 1
            }
            styles.push(classes.substring(y, x))
            y = x + 1
        }
    }

    let classesCopy = `${classes}`

    for (let i = 0; i < prefixes.length; i++) {
        if (newClasses?.includes(prefixes[i])) {
            classesCopy = classesCopy.replace(styles[i], '')
        }
    }

    return classesCopy
}

export default tailwindStyleReplacment
