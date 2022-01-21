import { ChangeEvent } from 'react'

type DropDownProps = {
    onChange: (val: ChangeEvent<HTMLSelectElement>) => void
    value: number | string
    children: React.ReactNode[]
    name?: string
}

const DropDown = (props: DropDownProps) => {
    const { onChange, value, name, children } = props
    return (
        <div className="flex flex-col mx-auto">
            <label htmlFor={name}> {name} </label>
            <select
                name={name}
                className="mt-2 px-8 py-2 my-2  text-left rounded-md bg-gray-100"
                onChange={(val) => {
                    onChange(val)
                }}
                value={value}
            >
                {children}
            </select>
        </div>
    )
}

DropDown.defaultProps = { name: '' }

export default DropDown
