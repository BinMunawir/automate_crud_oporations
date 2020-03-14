export const tables = `

 CREATE TABLE Users (
	userID		VARCHAR(255),
	name		VARCHAR(255)		NOT NULL UNIQUE,
	password		VARCHAR(255),
	date		BIGINT,
	avatar		VARCHAR(255),
PRIMARY KEY (userID)
);

 

`;