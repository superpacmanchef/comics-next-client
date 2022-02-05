type Props = {
    text: string
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick: Function
    styles?: string
    ref?: any
    disabled?: boolean
}

const MainButton = (props: Props) => {
    const { text, onClick, styles, ref, disabled } = props

    return (
        <button
            disabled={disabled}
            ref={ref}
            type="button"
            className={`bg-blue-700 hover:bg-blue-600 rounded-md px-4 py-2 disabled:bg-gray-500 text-white ${styles} `}
            onClick={() => {
                onClick()
            }}
        >
            <p className="w-full text-base text-center">{text}</p>
        </button>
    )
}

MainButton.defaultProps = { styles: '', ref: null, disabled: false }
export default MainButton
