/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <div className="min-h-full bg-gray-600">
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}

export default MyApp
