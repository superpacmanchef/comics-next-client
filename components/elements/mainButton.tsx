import { useEffect, useState } from 'react'
import tailwindStyleReplacment from '../../utils/tailwindStylesReplacement'

type Props = {
    text: string
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick: Function
    styles?: string
    ref?: any
}

const MainButton = (props: Props) => {
    const { text, onClick, styles, ref } = props
    const [styleState, updateStylesState] = useState('')

    useEffect(() => {
        const defaultStyles =
            'rounded-md bg-blue-700 px-4 py-2 hover:bg-blue-600 text-white'
        const removedConflictsStyles = tailwindStyleReplacment(
            defaultStyles,
            styles !== undefined ? styles : ''
        )

        updateStylesState(`${styles} ${removedConflictsStyles}`)
    }, [styles])

    return (
        <button
            ref={ref}
            type="button"
            className={styleState}
            onClick={() => {
                onClick()
            }}
        >
            <p className="w-full text-base text-center">{text}</p>
        </button>
    )
}

MainButton.defaultProps = { styles: '', ref: null }
export default MainButton
