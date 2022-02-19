type TextInputProps = {
    placeholder: string
    onChange: (val: any) => void
    value: string
    passwordFlag?: boolean
    requiredFlag?: boolean
}

const TextInput = (props: TextInputProps) => {
    const { placeholder, onChange, value, passwordFlag, requiredFlag } = props
    return (
        <input
            className="h-12 p-2 mx-auto border border-gray-700 rounded-md shadow-inner shadow-gray-300"
            type={!passwordFlag ? 'text' : 'password'}
            onChange={onChange}
            placeholder={placeholder}
            required={requiredFlag}
            value={value}
        />
    )
}

TextInput.defaultProps = { passwordFlag: false, requiredFlag: false }

export default TextInput
