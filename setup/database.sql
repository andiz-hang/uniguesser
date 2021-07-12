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
insert into university (university_name, abbreviation)
			values ('Dalhousie University', 'Dal');
insert into university (university_name, abbreviation)
			values ('McGill University', 'McGill');
insert into university (university_name, abbreviation)
			values ('University of Toronto', 'UofT');
insert into university (university_name, abbreviation)
			values ('University of Alberta', 'UofA');

insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (1, 'Burnaby Campus', '8888 University Dr', 'Burnaby', 'BC', 'Canada', 'V5A1S6');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (1, 'Surrey Campus', '13450 102 Ave #250', 'Surrey', 'BC', 'Canada', 'V3T0A3');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (1, 'Vancouver Campus', '515 W Hastings St', 'Vancouver', 'BC', 'Canada', 'V6B5K3');

insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (2, 'Vancouver Campus', '2329 West Mall', 'Vancouver', 'BC', 'Canada', 'V6T1Z4');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (2, 'Okanagan Campus', '3333 University Way', 'Kelowna', 'BC', 'Canada', 'V1V1V7');

insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (3, 'Studley Campus', '6299 South St', 'Halifax', 'NS', 'Canada', 'B3H4R2');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (3, 'Sexton Campus', '1360 Barrington Street', 'Halifax', 'NS', 'Canada', 'B3H4R2');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (3, 'Agricultural Campus', '58 Sipu Road', 'Truro', 'NS', 'Canada', 'B2N5E3');

insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (4, 'Downtown Campus', '845 Sherbrooke Street West', 'Montreal', 'Quebec', 'QC', 'H3A0G4');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (4, 'Macdonald Campus', '21111 Lakeshore Road', 'Sainte-Anne-de-Bellevue', 'QC', 'Canada', 'H9X3V9');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (4, 'Gault Nature Reserve', '422 chemin des Moulins', 'Mont-Saint-Hilaire', 'QC', 'Canada', 'J3G4S6');

insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (5, 'St. George Campus', '27 King''s College Circle', 'Toronto', 'ON', 'Canada', 'M5S1A1');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (5, 'Mississauga Campus', '3359 Mississauga Road', 'Mississauga', 'ON', 'Canada', 'H9X3V9');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (5, 'Scarborough Campus', '1265 Military Trail', 'Toronto', 'ON', 'Canada', 'M1C1A4');

insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (6, 'North Campus', '11011-88 Avenue', 'Edmonton', 'AB', 'Canada', 'T6G2G5');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (6, 'Campus Saint-Jean', '8406, rue Marie-Anne Gaboury (91e rue NO)', 'Edmonton', 'AB', 'Canada', 'T6C4G9');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (6, 'Augustana Campus', '4901-46 Avenue', 'Camrose', 'AB', 'Canada', 'T4V2R3');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (6, 'South Campus', '1265 Military Trail', 'Toronto', 'Ontario', 'Canada', 'M1C1A4');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (6, 'Enterprise Square', '1265 Military Trail', 'Toronto', 'Ontario', 'Canada', 'M1C1A4');