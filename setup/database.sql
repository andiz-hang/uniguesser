DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS university CASCADE;
DROP TABLE IF EXISTS campus CASCADE;
DROP TABLE IF EXISTS game_session CASCADE;

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    email TEXT
);

CREATE TABLE university (
    university_id SERIAL PRIMARY KEY NOT NULL,
    university_name TEXT NOT NULL
);

CREATE TABLE campus (
    campus_id SERIAL PRIMARY KEY NOT NULL,
    university_id INTEGER NOT NULL,
    campus_name TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    province TEXT,
    country TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    FOREIGN KEY (university_id) REFERENCES university(university_id)
);

CREATE TABLE game_session (
    session_id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    score NUMERIC,
    duration INTERVAL,
    created_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);