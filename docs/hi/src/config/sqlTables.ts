    export const tables = `
          CREATE TABLE Users (
        userID		VARCHAR(20),
password		INT,
PRIMARY KEY (userID)
              );
                  CREATE TABLE Orders (
        orderID		VARCHAR(255),
userID		VARCHAR(255),
PRIMARY KEY (orderID, userID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
              );
                  CREATE TABLE OrderImages (
        orderImageID		VARCHAR(255),
userID		VARCHAR(255),
orderID		VARCHAR(255),
PRIMARY KEY (orderImageID, userID, orderID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
, FOREIGN KEY (orderID) REFERENCES Orders (orderID)
              );
                `;
    