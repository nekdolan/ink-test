// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        baseURL: '/ink-test/',
        head: {
            link: [
                { rel: 'icon', type: 'image/png', sizes:'32x32', href:'/favicon/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes:'16x16', href:'/favicon/favicon-16x16.png' },
                { rel: 'apple-touch-icon', sizes: '180x180', href:'/favicon/apple-touch-icon.png' },
                { rel: 'manifest', href:'/favicon/site.webmanifest' },
            ]
        }
    },
    modules: [
        '@inkline/plugin/nuxt',
        '@nuxt/content',
        '@nuxt/image'
    ],
    compatibilityDate: '2025-07-15',

    devServer: {
        port: 3004
    },

    nitro: {
        preset: 'github_pages' // makes output compatible with GitHub Pages
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    logger: {
                        warn(message, options) {
                            // Mute "Mixed Declarations" warning
                            if (options.deprecation && message.includes('mixed-decls')) {
                                return;
                            }
                            // List all other warnings
                            console.warn(`▲ [WARNING]: ${message}`);
                        }
                    }
                }
            }
        },
        plugins: [
            {
                name: 'inkline-template-fix',
                enforce: 'pre',
                transform(code, id) {
                    // Adjust if your path looks slightly different in the error
                    if (id.includes('virtual:nuxt:') && id.includes('inkline.mjs')) {
                        // Replace the EJS placeholder with static JSON
                        const options = {
                            color: 'light',
                            colorMode: 'light',
                            colorModeStrategy: null,
                            renderMode: 'universal'
                        }
                        return {
                            code: code.replace(
                              /<%= JSON\.stringify\(options, 4\) %>/g,
                              JSON.stringify(options, null, 4)
                            ),
                            map: null
                        }
                    }
                    return null
                }
            }
        ]
    },

    inkline: {
        globals: {
            color: 'light',
            colorMode: 'light',
            colorModeStrategy: null
        }
    },

    experimental: {
        inlineSSRStyles: false
    },

    devtools: { enabled: false },

});