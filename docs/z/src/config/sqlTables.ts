    export const tables = `
    

CREATE TABLE Users (
	userID			VARCHAR(255),
	password			VARCHAR(255),
	username			VARCHAR(255) NOT NULL UNIQUE,
	avatar			VARCHAR(255),
	cv			VARCHAR(255),
PRIMARY KEY (userID)
);


CREATE TABLE Notes (
	noteID			VARCHAR(255),
	userID			VARCHAR(255),
	title			VARCHAR(255),
PRIMARY KEY (noteID, userID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
);


CREATE TABLE NoteImages (
	noteImageID			VARCHAR(255),
	userID			VARCHAR(255),
	noteID			VARCHAR(255),
	content			VARCHAR(255),
	cover			VARCHAR(255),
PRIMARY KEY (noteImageID, userID, noteID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
, FOREIGN KEY (noteID) REFERENCES Notes (noteID)
);


CREATE TABLE Companies (
	companyID			VARCHAR(255),
	password			VARCHAR(255),
	email			VARCHAR(255) NOT NULL UNIQUE,
	phone			VARCHAR(255) NOT NULL UNIQUE,
	title			VARCHAR(255),
PRIMARY KEY (companyID)
);


CREATE TABLE Adds (
	addID			VARCHAR(255),
	companyID			VARCHAR(255),
	title			VARCHAR(255),
PRIMARY KEY (addID, companyID)
, FOREIGN KEY (companyID) REFERENCES Companies (companyID)
);


CREATE TABLE Offers (
	offerID			VARCHAR(255),
	content			VARCHAR(255),
PRIMARY KEY (offerID)
);
    `;
    