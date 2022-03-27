type Props = {
    onClick?: () => void
    styles?: string
    disabled?: boolean
    submitFlag?: boolean
    children: React.ReactNode
}

const MainButton = (props: Props) => {
    const { onClick, styles, disabled, submitFlag, children } = props

    return (
        <button
            disabled={disabled}
            type={submitFlag ? 'submit' : 'button'}
            className={`bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 disabled:bg-gray-500 text-white ${styles} `}
            onClick={() => {
                if (!submitFlag && onClick) {
                    onClick()
                }
            }}
            onKeyPress={() => {
                if (!submitFlag && onClick) {
                    onClick()
                }
            }}
        >
            {children}
        </button>
    )
}

MainButton.defaultProps = {
    styles: '',
    disabled: false,
    submitFlag: false,
    onClick: () => {},
}
export default MainButton
