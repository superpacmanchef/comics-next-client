/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="min-w-full min-h-screen bg-gray-600">
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
