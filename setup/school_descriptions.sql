ALTER TABLE university ADD school_description TEXT;

UPDATE university 
SET school_description = 
'Simon Fraser University (SFU) is a public research university in British Columbia, Canada, with three campuses: Burnaby (main campus), Surrey, and Vancouver. The 170-hectare (420-acre) main Burnaby campus on Burnaby Mountain, located 20 kilometres (12 mi) from downtown Vancouver, was established in 1965 and comprises more than 30,000 students and 160,000 alumni. The university was created in an effort to expand higher education across Canada.' 
WHERE abbreviation = 'SFU';

UPDATE university 
SET school_description = 
'The University of British Columbia (UBC) is a public research university with campuses in Vancouver and Kelowna, British Columbia. Established in 1908, UBC is British Columbia''s oldest university. The university ranks among the top three universities in Canada.[8][9][10][11] With an annual research budget of $600 million, UBC funds over 8,000 projects a year'
WHERE abbreviation = 'UBC';

UPDATE university 
SET school_description = 
'Dalhousie University (commonly known as Dal) is a public research university in Nova Scotia, Canada, with three campuses in Halifax, a fourth in Bible Hill, and medical teaching facilities in Saint John, New Brunswick. Dalhousie offers more than 4,000 courses, and 180 degree programs in twelve undergraduate, graduate, and professional faculties.[6] The university is a member of the U15, a group of research-intensive universities in Canada.'
WHERE abbreviation = 'Dal';

UPDATE university 
SET school_description = 
'McGill University is a public research university located in Montreal, Quebec, Canada. Founded in 1821 by royal charter granted by King George IV,[9] the university bears the name of James McGill, a Scottish merchant whose bequest in 1813 formed the university''s precursor, University of McGill College (or simply, McGill College); the name was officially changed to McGill University in 1885. '
WHERE abbreviation = 'McGill';

UPDATE university 
SET school_description = 
'The University of Toronto (U of T or UToronto) is a public research university in Toronto, Ontario, Canada, located on the grounds that surround Queen''s Park. It was founded by royal charter in 1827 as King''s College, the first institution of higher learning in Upper Canada. Originally controlled by the Church of England, the university assumed its present name in 1850 upon becoming a secular institution. As a collegiate university, it comprises eleven colleges each with substantial autonomy on financial and institutional affairs and significant differences in character and history. The university also operates two suburban campuses located in Scarborough and Mississauga.'
WHERE abbreviation = 'UofT';

UPDATE university 
SET school_description = 
'The University of Alberta, also known as U of A or UAlberta, is a public research university located in Edmonton, Alberta, Canada. It was founded in 1908 by Alexander Cameron Rutherford, the first premier of Alberta, and Henry Marshall Tory, the university''s first president. It was enabled through the Post-secondary Learning Act. The university comprises four campuses in Edmonton, an Augustana Campus in Camrose, and a staff centre in downtown Calgary. The original north campus consists of 150 buildings covering 50 city blocks on the south rim of the North Saskatchewan River valley, directly across from downtown Edmonton. 39,000 students from Canada and 150 other countries participate in 400 programs in 18 faculties. '
WHERE abbreviation = 'UofA';

