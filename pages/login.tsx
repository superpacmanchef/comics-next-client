/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import { useUser } from '../lib/hooks'

const Login = () => {
    const [inputUsername, updateInputUsername] = useState('')
    const [inputPassword, updateInputPassword] = useState('')

    const [user, { mutate }] = useUser()
    const [errorMsg, setErrorMsg] = useState('')

    const logUser = async () => {
        const body = {
            username: inputUsername,
            password: inputPassword,
        }
        console.log(body)
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (res.status === 200) {
            const userObj = await res.json()
            console.log(userObj)
            // set user to useSWR state
            mutate(userObj)
        } else {
            console.log('WROOOONG')
            setErrorMsg('Incorrect username or password. Try better!')
        }
    }

    return (
        <div>
            <label htmlFor="fname">Username</label>
            <input
                type="text"
                onChange={(val) => {
                    updateInputUsername(val.target.value)
                }}
            />
            <br />
            <br />
            <label htmlFor="lname">Password</label>
            <input
                value={inputPassword}
                type="text"
                onChange={(val) => {
                    updateInputPassword(val.target.value)
                }}
            />
            <br />
            <br />
            <input
                type="submit"
                value="Submit"
                onClick={(e) => {
                    e.stopPropagation()
                    logUser()
                }}
            />
        </div>
    )
}

export default Login
