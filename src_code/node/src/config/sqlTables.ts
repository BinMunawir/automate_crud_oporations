export const tables = `

 CREATE TABLE Users (
	userID		VARCHAR(255),
	name		VARCHAR(255)		NOT NULL UNIQUE,
	password		VARCHAR(255),
PRIMARY KEY (userID)
);

CREATE TABLE Admins (
	adminID		VARCHAR(255),
	name		VARCHAR(255)		NOT NULL UNIQUE,
	password		VARCHAR(255),
PRIMARY KEY (adminID)
);

CREATE TABLE Notes (
	userID		VARCHAR(255),
	noteID		VARCHAR(255),
	title		VARCHAR(255),
	content		VARCHAR(255),
	date		INT,
PRIMARY KEY (noteID)
);

CREATE TABLE NoteImages (
	userID		VARCHAR(255),
	noteID		VARCHAR(255),
	noteImageID		VARCHAR(255),
	image		VARCHAR(255),
PRIMARY KEY (noteImageID)
);

CREATE TABLE Books (
	bookID		VARCHAR(255),
	title		VARCHAR(255),
PRIMARY KEY (bookID)
);

CREATE TABLE Downloads (
	userID		VARCHAR(255),
	bookID		VARCHAR(255),
	downloadID		VARCHAR(255),
	data		INT,
PRIMARY KEY (downloadID)
);

CREATE TABLE Groups (
	groupID		VARCHAR(255),
	title		VARCHAR(255),
PRIMARY KEY (groupID)
);

 

`;