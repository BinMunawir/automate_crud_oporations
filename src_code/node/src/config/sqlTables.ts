export const tables = `


CREATE TABLE Users (
	userID			VARCHAR(255),
	password			VARCHAR(255),
	username			VARCHAR(255) NOT NULL UNIQUE,
PRIMARY KEY (userID)
);


CREATE TABLE Admins (
	adminID			INT NOT NULL AUTO_INCREMENT,
	password			VARCHAR(255),
PRIMARY KEY (adminID)
);


CREATE TABLE Managers (
	managerID			INT NOT NULL AUTO_INCREMENT,
	password			VARCHAR(255),
	phone			VARCHAR(255) NOT NULL UNIQUE,
PRIMARY KEY (managerID)
);


CREATE TABLE Owners (
	OwnerID			INT NOT NULL AUTO_INCREMENT,
	phone			VARCHAR(255) NOT NULL UNIQUE,
PRIMARY KEY (OwnerID)
);


CREATE TABLE Companies (
	companyID			INT NOT NULL AUTO_INCREMENT,
	password			VARCHAR(255),
	email			VARCHAR(255) NOT NULL UNIQUE,
PRIMARY KEY (companyID)
);


CREATE TABLE Notes (
	noteID			VARCHAR(255),
	userID			VARCHAR(255),
	title			VARCHAR(255),
PRIMARY KEY (noteID, userID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
);


CREATE TABLE NoteImages (
	noteImageID			INT NOT NULL AUTO_INCREMENT,
	userID			VARCHAR(255),
	noteID			VARCHAR(255),
	content			VARCHAR(255),
	cover			VARCHAR(255),
PRIMARY KEY (noteImageID, userID, noteID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
, FOREIGN KEY (noteID) REFERENCES Notes (noteID)
);

`;