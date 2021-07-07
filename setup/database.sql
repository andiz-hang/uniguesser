DROP TABLE IF EXISTS "user" CASCADE;
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
    university_name TEXT NOT NULL,
    abbreviation TEXT
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

insert into university (university_name, abbreviation) 
			values ('Simon Fraser University', 'SFU');
insert into university (university_name, abbreviation) 
			values ('University of British Columbia', 'UBC');

insert into campus (university_id, campus_name, street, city, province, country, postal_code) 
			values (1, 'SFU Burnaby', '8888 University Dr', 'Burnaby', 'BC', 'Canada', 'V5A1S6');
insert into campus (university_id, campus_name, street, city, province, country, postal_code) 
			values (1, 'SFU Surrey', '13450 102 Ave #250', 'Surrey', 'BC', 'Canada', 'V3T0A3');
insert into campus (university_id, campus_name, street, city, province, country, postal_code) 
			values (2, 'UBC Vancouver', '2329 West Mall', 'Vancouver', 'BC', 'Canada', 'V6T1Z4');
insert into campus (university_id, campus_name, street, city, province, country, postal_code) 
			values (2, 'UBC Okanagan', '3333 University Way', 'Kelowna', 'BC', 'Canada', 'V1V1V7');                        