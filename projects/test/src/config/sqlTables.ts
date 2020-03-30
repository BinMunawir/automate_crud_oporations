export const tables = `

 CREATE TABLE Users (
	userID		VARCHAR(255),
	email		VARCHAR(255),
	phone		VARCHAR(255)		UNIQUE,
PRIMARY KEY (userID)
);

CREATE TABLE Notes (
	userID		VARCHAR(255),
	noteID		VARCHAR(255),
	title		VARCHAR(255)		NOT NULL,
PRIMARY KEY (noteID)
);

 

`;