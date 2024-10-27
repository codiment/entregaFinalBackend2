// src/config/config.js
import dotenv from "dotenv";
import path from "path";

class Config {
    constructor() {
        this.loadEnv();
    }

    loadEnv() {
        const env = process.env.NODE_ENV || "development";
        dotenv.config({ path: path.resolve(`.env.${env}`) });
    }

    get(key) {
        return process.env[key];
    }
}

const configInstance = new Config();
Object.freeze(configInstance);

export default configInstance;