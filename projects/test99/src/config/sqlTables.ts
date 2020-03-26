export const tables = `

 CREATE TABLE Users (
	userID		VARCHAR(255),
	avatar		VARCHAR(255),
PRIMARY KEY (userID)
);

CREATE TABLE Notes (
	userID		VARCHAR(255),
	noteID		VARCHAR(255),
PRIMARY KEY (noteID)
);

 

`;