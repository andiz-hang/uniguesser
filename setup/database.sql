DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS university CASCADE;
DROP TABLE IF EXISTS campus CASCADE;
DROP TABLE IF EXISTS game_session CASCADE;

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
	country TEXT
);

CREATE TABLE university (
    university_id SERIAL PRIMARY KEY NOT NULL,
    university_name TEXT NOT NULL,
    abbreviation TEXT,
	school_description TEXT
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

-- Add universities and campuses
insert into university (university_name, abbreviation, school_description)
			values (
				'Simon Fraser University',
				'SFU',
				'Simon Fraser University (SFU) is a public research university in British Columbia, Canada, with three campuses: Burnaby (main campus), Surrey, and Vancouver. The 170-hectare (420-acre) main Burnaby campus on Burnaby Mountain, located 20 kilometres (12 mi) from downtown Vancouver, was established in 1965 and comprises more than 30,000 students and 160,000 alumni. The university was created in an effort to expand higher education across Canada.'
			);

insert into university (university_name, abbreviation, school_description)
			values (
				'University of British Columbia',
				'UBC',
				'The University of British Columbia (UBC) is a public research university with campuses in Vancouver and Kelowna, British Columbia. Established in 1908, UBC is British Columbia''s oldest university. The university ranks among the top three universities in Canada. With an annual research budget of $600 million, UBC funds over 8,000 projects a year'
			);

insert into university (university_name, abbreviation, school_description)
			values (
				'Dalhousie University',
				'Dal',
				'Dalhousie University (commonly known as Dal) is a public research university in Nova Scotia, Canada, with three campuses in Halifax, a fourth in Bible Hill, and medical teaching facilities in Saint John, New Brunswick. Dalhousie offers more than 4,000 courses, and 180 degree programs in twelve undergraduate, graduate, and professional faculties. The university is a member of the U15, a group of research-intensive universities in Canada.'
			);
insert into university (university_name, abbreviation, school_description)
			values (
				'McGill University',
				'McGill',
				'McGill University is a public research university located in Montreal, Quebec, Canada. Founded in 1821 by royal charter granted by King George IV, the university bears the name of James McGill, a Scottish merchant whose bequest in 1813 formed the university''s precursor, University of McGill College (or simply, McGill College); the name was officially changed to McGill University in 1885.'
			);
insert into university (university_name, abbreviation, school_description)
			values (
				'University of Toronto',
				'UofT',
				'The University of Toronto (U of T or UToronto) is a public research university in Toronto, Ontario, Canada, located on the grounds that surround Queen''s Park. It was founded by royal charter in 1827 as King''s College, the first institution of higher learning in Upper Canada. Originally controlled by the Church of England, the university assumed its present name in 1850 upon becoming a secular institution. As a collegiate university, it comprises eleven colleges each with substantial autonomy on financial and institutional affairs and significant differences in character and history. The university also operates two suburban campuses located in Scarborough and Mississauga.'
			);
insert into university (university_name, abbreviation, school_description)
			values (
				'University of Alberta',
				'UofA',
				'The University of Alberta, also known as U of A or UAlberta, is a public research university located in Edmonton, Alberta, Canada. It was founded in 1908 by Alexander Cameron Rutherford, the first premier of Alberta, and Henry Marshall Tory, the university''s first president. It was enabled through the Post-secondary Learning Act. The university comprises four campuses in Edmonton, an Augustana Campus in Camrose, and a staff centre in downtown Calgary. The original north campus consists of 150 buildings covering 50 city blocks on the south rim of the North Saskatchewan River valley, directly across from downtown Edmonton. 39,000 students from Canada and 150 other countries participate in 400 programs in 18 faculties. '
			);

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
			values (4, 'Downtown Campus', '845 Sherbrooke Street West', 'Montreal', 'QC', 'Canada', 'H3A0G4');
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
			values (6, 'South Campus', '11610 - 65 Avenue', 'Edmonton', 'AB', 'Canada', 'M1C1A4');
insert into campus (university_id, campus_name, street, city, province, country, postal_code)
			values (6, 'Enterprise Square', '10230 Jasper Avenue', 'Edmonton', 'AB', 'Canada', 'T6G2E1');


-- Add users
insert into "user" (username, password, country)
			values ('jason', '$2b$10$6./cFDETHc8lWMwzRxF0JOtsdJ.S5qFM4BOk2iy9o0AKIDAEm62y2', 'USA'); -- password: red
insert into "user" (username, password, country)
			values ('trini', '$2b$10$gzhyp2/OK7f1ZpN7IvsV1.5rS22Moy3q8KMjecWsF8scEp1Rb4f02', 'Namibia'); -- password: yellow
insert into "user" (username, password, country)
			values ('zack', '$2b$10$sPRw/N.F7NuUUrYwOl/Ntud6Lmn5Gq79yRhcFBP3XsDTZUF15BFz.', 'Brazil'); -- password: black
insert into "user" (username, password, country)
			values ('kim', '$2b$10$oY15KMHMGUg1ihjapBVSR..Ilnt7er4/BJnMrUoChHryiEDYR7QzW', 'China'); -- password: pink
insert into "user" (username, password, country)
			values ('billy', '$2b$10$jbGxx.9lc9vE5ENMUMcI2uB5mVTFZ65zh8/4DHwzF/nOd3nayB4Im', 'Canada'); -- password: blue
insert into "user" (username, password, country)
			values ('tommy', '$2b$10$jhQfbfH4e6EkWu4t99bPb.qVZ67Hxypr.W3sv7dFxX5X7klRHcA5y', 'Antarctica'); -- password: green