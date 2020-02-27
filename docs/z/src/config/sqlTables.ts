    export const tables = `
    

CREATE TABLE Organizations (
	organizationID			VARCHAR(255),
	arabicName			VARCHAR(255),
	englishName			VARCHAR(255),
	domain			VARCHAR(255),
	type			VARCHAR(255),
PRIMARY KEY (organizationID)
);


CREATE TABLE Users (
	userID			VARCHAR(255),
	password			VARCHAR(255),
	name			VARCHAR(255),
	email			VARCHAR(255) NOT NULL UNIQUE,
	phone			VARCHAR(255),
	status			INT,
	lastActivity			BIGINT,
	organizationID			VARCHAR(255),
	addedDate			BIGINT,
PRIMARY KEY (userID, organizationID)
, FOREIGN KEY (organizationID) REFERENCES Organizations (organizationID)
);


CREATE TABLE Admins (
	adminID			VARCHAR(255),
	name			VARCHAR(255),
	password			VARCHAR(255),
	role			VARCHAR(255),
	email			VARCHAR(255),
	addedDate			BIGINT,
	lastActivity			BIGINT,
	status			INT,
PRIMARY KEY (adminID)
);


CREATE TABLE Books (
	bookID			VARCHAR(255),
	adminID			VARCHAR(255),
	arabicTitle			VARCHAR(255),
	englishTitle			VARCHAR(255),
	number			INT,
	lastModified			INT,
	modifiedBy			INT,
	version			INT,
	video			VARCHAR(255),
PRIMARY KEY (bookID, adminID)
, FOREIGN KEY (adminID) REFERENCES Admins (adminID)
);


CREATE TABLE Volumes (
	volumeID			VARCHAR(255),
	adminID			VARCHAR(255),
	bookID			VARCHAR(255),
	arabicTitle			VARCHAR(255),
	englishTitle			VARCHAR(255),
	lastModified			INT,
	modifiedBy			INT,
	version			INT,
	video			VARCHAR(255),
PRIMARY KEY (volumeID, adminID, bookID)
, FOREIGN KEY (adminID) REFERENCES Admins (adminID)
, FOREIGN KEY (bookID) REFERENCES Books (bookID)
);


CREATE TABLE Chapters (
	chapterID			VARCHAR(255),
	adminID			VARCHAR(255),
	bookID			VARCHAR(255),
	volumeID			VARCHAR(255),
	arabicTitle			VARCHAR(255),
	englishTitle			VARCHAR(255),
	lastModified			INT,
	modifiedBy			INT,
	versionNumber			INT,
	versionDate			INT,
	chapter			VARCHAR(255),
PRIMARY KEY (chapterID, adminID, bookID, volumeID)
, FOREIGN KEY (adminID) REFERENCES Admins (adminID)
, FOREIGN KEY (bookID) REFERENCES Books (bookID)
, FOREIGN KEY (volumeID) REFERENCES Volumes (volumeID)
);


CREATE TABLE Documents (
	documentID			VARCHAR(255),
	adminID			VARCHAR(255),
	bookID			VARCHAR(255),
	volumeID			VARCHAR(255),
	chapterID			VARCHAR(255),
	arabicTitle			VARCHAR(255),
	englishTitle			VARCHAR(255),
	lastModified			INT,
	modifiedBy			INT,
	versionNumber			INT,
	document			VARCHAR(255),
PRIMARY KEY (documentID, adminID, bookID, volumeID, chapterID)
, FOREIGN KEY (adminID) REFERENCES Admins (adminID)
, FOREIGN KEY (bookID) REFERENCES Books (bookID)
, FOREIGN KEY (volumeID) REFERENCES Volumes (volumeID)
, FOREIGN KEY (chapterID) REFERENCES Chapters (chapterID)
);


CREATE TABLE Glossaries (
	glossaryID			VARCHAR(255),
	adminID			VARCHAR(255),
	word			VARCHAR(255),
	meaning			VARCHAR(255),
	addedDate			INT,
	lastModified			INT,
PRIMARY KEY (glossaryID, adminID)
, FOREIGN KEY (adminID) REFERENCES Admins (adminID)
);


CREATE TABLE Inquiries (
	inquiryID			VARCHAR(255),
	organizationID			VARCHAR(255),
	userID			VARCHAR(255),
	inquiry			VARCHAR(255),
	response			VARCHAR(255),
	status			INT,
	adminID			INT,
PRIMARY KEY (inquiryID, organizationID, userID)
, FOREIGN KEY (organizationID) REFERENCES Organizations (organizationID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
);
    `;
    