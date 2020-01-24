    export const tables = `
          CREATE TABLE Users (
        userID		VARCHAR(255),
password		VARCHAR(255),
name		VARCHAR(255),
date		INT,
book		VARCHAR(255),
avatar		VARCHAR(255),
PRIMARY KEY (userID)
              );
                  CREATE TABLE Notes (
        noteID		VARCHAR(255),
userID		VARCHAR(255),
title		VARCHAR(255),
PRIMARY KEY (noteID, userID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
              );
                  CREATE TABLE NoteImages (
        noteImageID		VARCHAR(255),
userID		VARCHAR(255),
noteID		VARCHAR(255),
content		VARCHAR(255),
cover		VARCHAR(255),
PRIMARY KEY (noteImageID, userID, noteID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
, FOREIGN KEY (noteID) REFERENCES Notes (noteID)
              );
                `;
    