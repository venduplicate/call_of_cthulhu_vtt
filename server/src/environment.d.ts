declare global {
    namespace NodeJS {
        interface ProcessEnv {
            FIREBASE_TYPE: string
            FIREBASE_PROJECT_ID: string
            FIREBASE_PRIVATE_KEYID: string
            FIREBASE_PRIVATE_KEY: string
            FIREBASE_CLIENT_EMAIL: string
            FIREBASE_CLIENT_ID: string
            FIREBASE_AUTH_URI: string
            FIREBASE_TOKEN_URI: string
            FIREBASE_AUTH_CERT_URL: string
            FIREBASE_CLIENT_CERT_URL: string
            DISCORD_TOKEN: string;
            LOGTAIL_TOKEN: string;
            HOST_URL: string;
            REDISCLOUD_URL: string;
            FIREBASE_JSON: string;
        }
    }
}

export { }