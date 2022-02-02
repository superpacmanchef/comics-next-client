/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            'comicvine.gamespot.com',
            'static.metron.cloud',
            'i.annihil.us',"external-content.duckduckgo.com"
        ],
    },

    webpack: (config) => {
        config.experiments.topLevelAwait = true
        return config
    },
}
