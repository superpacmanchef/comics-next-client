type Props = {
    text: string
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick: () => void
    styles?: string
    ref?: any
    disabled?: boolean
    submitFlag?: boolean
}

const MainButton = (props: Props) => {
    const { text, onClick, styles, ref, disabled, submitFlag } = props

    return (
        <button
            disabled={disabled}
            ref={ref}
            type={submitFlag ? 'submit' : 'button'}
            className={`bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 disabled:bg-gray-500 text-white ${styles} `}
            onClick={() => {
                onClick()
            }}
            onKeyPress={() => {
                onClick()
            }}
        >
            <p className="w-full text-base text-center">{text}</p>
        </button>
    )
}

MainButton.defaultProps = {
    styles: '',
    ref: null,
    disabled: false,
    submitFlag: false,
}
export default MainButton
