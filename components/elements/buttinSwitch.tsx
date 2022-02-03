import { useState } from 'react'
import MainButton from './mainButton'

type ButtonSwitchPropType = {
    button1Text: string
    button2Text: string
    button1Func: () => void
    button2Func: () => void
}

const ButtonSwitch = (props: ButtonSwitchPropType) => {
    const { button1Text, button2Text, button1Func, button2Func } = props

    const [switchState, updateSwitchState] = useState(0)

    return (
        <div className="flex flex-row justify-center flex-1">
            <MainButton
                text={button1Text}
                onClick={() => {
                    button1Func()
                    updateSwitchState(0)
                }}
                styles={`flex mb-8 w-1/4 rounded-none text-white
                     ${
                         switchState === 1
                             ? 'bg-gray-500 shadow-inner shadow-gray-600 z-10'
                             : ''
                     }`}
            />

            <MainButton
                text={button2Text}
                onClick={() => {
                    button2Func()
                    updateSwitchState(1)
                }}
                styles={`flex text-white mb-8 w-1/4 rounded-none 
                     ${
                         switchState === 0
                             ? 'bg-gray-500 shadow-inner shadow-gray-600 z-10'
                             : ''
                     }`}
            />
        </div>
    )
}

export default ButtonSwitch
