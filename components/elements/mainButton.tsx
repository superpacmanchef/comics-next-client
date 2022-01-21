type Props = {
    text: string
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick: Function
    styles?: string
}

const MainButton = (props: Props) => {
    const { text, onClick, styles } = props

    return (
        <button
            type="button"
            className={`${styles} rounded-md  bg-blue-700  px-4 py-2 hover:bg-blue-600`}
            onClick={() => {
                onClick()
            }}
        >
            <p className="text-base text-white">{text}</p>
        </button>
    )
}

MainButton.defaultProps = { styles: '' }
export default MainButton
