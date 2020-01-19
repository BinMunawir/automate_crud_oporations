    export const tables = `
          CREATE TABLE Users (
        userID		VARCHAR(255),
password		VARCHAR(255),
name		VARCHAR(255),
date		INT,
avatar		VARCHAR(255),
PRIMARY KEY (userID)
              );
                  CREATE TABLE Notes (
        noteID		VARCHAR(255),
userID		VARCHAR(255),
title		VARCHAR(255),
date		INT,
image		VARCHAR(255),
PRIMARY KEY (noteID, userID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
              );
                  CREATE TABLE Offers (
        offerID		VARCHAR(255),
title		VARCHAR(255),
number		INT,
PRIMARY KEY (offerID)
              );
                `;
    