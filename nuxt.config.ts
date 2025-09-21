// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: [
        '@inkline/plugin/nuxt',
        "@nuxt/image"
    ],
    compatibilityDate: '2025-07-15',

    devServer: {
        port: 3004
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