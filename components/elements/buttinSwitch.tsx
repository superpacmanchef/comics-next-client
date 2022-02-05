/* eslint-disable react/destructuring-assignment */
import { useState } from 'react'

type ButtonSwitchPropType = {
    button1Text: string
    button2Text: string
    button1Func: () => void
    button2Func: () => void
}

const SwitchButton = (props: any) => {
    return (
        <button
            type="button"
            className={`${
                !props.active
                    ? 'bg-blue-700 hover:bg-blue-600'
                    : 'bg-gray-500 hover:bg-slate-500'
            } rounded-md px-4 py-2 text-white ${props.styles}`}
            onClick={() => {
                props.onClick()
            }}
        >
            <p className="w-full text-base text-center">{props.text}</p>
        </button>
    )
}

const ButtonSwitch = (props: ButtonSwitchPropType) => {
    const { button1Text, button2Text, button1Func, button2Func } = props

    const [switchState, updateSwitchState] = useState(0)

    return (
        <div className="flex flex-row justify-center flex-1">
            <SwitchButton
                text={button1Text}
                onClick={() => {
                    button1Func()
                    updateSwitchState(0)
                }}
                active={switchState === 1}
                styles={`flex mb-8 w-1/2 md:w-1/4 rounded-none text-white
                     ${
                         switchState === 1
                             ? 'shadow-inner shadow-gray-600 z-10'
                             : ''
                     }`}
            />

            <SwitchButton
                text={button2Text}
                onClick={() => {
                    button2Func()
                    updateSwitchState(1)
                }}
                active={switchState === 0}
                styles={`flex text-white mb-8 w-1/2  md:w-1/4 rounded-none 
                     ${
                         switchState === 0
                             ? 'shadow-inner shadow-slate-700 z-10'
                             : ''
                     }`}
            />
        </div>
    )
}

export default ButtonSwitch
