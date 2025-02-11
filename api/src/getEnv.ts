import { config } from "dotenv";

config();

// JWT
export const JWT_SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;
export const JWT_SECRET_KEY_FILES_256BIT = `${process.env.JWT_SECRET_KEY_FILES_256BIT}`;
export const JWT_EXPIRES_IN = `${process.env.JWT_EXPIRES_IN}`;

// DB
export const DATABASE_URL = `${process.env.DATABASE_URL}`;
