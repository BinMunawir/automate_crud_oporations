



# API design
---


# Concepts:.
- #### Each request is stateless that means it doesn't rely on the server to cash any temporary data
- #### URL represents a resource and how we can shape that resource to meet our needs
- #### Header is a metadata of the body(content)
- #### Body is just a data related to the business


# API style:.

- ## URL:
    > Start the URL path with api keyword.
    ```
    // www.{domain-name}.com/api
    ```
    > Design the URL to be ethier a collection of resources or an instance of a resource.
    ```
    collection >>>  // /api/users => list of users
    instance   >>>  // /api/users/{user-id} => a user
    ```
    > Use subcollections resources.
    ```
    subcollection of collection >>>  // /api/products/laptops => list of laptops
    subcollection of instance   >>>  // /api/users/{user-id}/orders => list of orders by a user
      Note: if the subcollection of instance is small we just embed it inside the object
            // Bad: /api/users/{user-id}/skills => list of user skills 
            // Good: /api/users/{user-id} => a user contains a filed called skills which is a list 
    ```
    > Use plural nouns rather than verbs.
    ```
    Good >>>    // GET: /api/users => list of users 
    Bad  >>>    // GET: /api/getUsers => list of users 
    Good >>>    // GET: /api/users/{user-id} => a user 
    Bad  >>>    // GET: /api/getUserById/{user-id} => a user
    ```
    > Use HTTP methods to do CRUD operations.
    ```
    GET: Read      // GET: /api/users => reade all users 
    POST: Create   // POST: /api/users => create a new user
    PUT: Update    // PUT: /api/users/{user-id} => update a user 
    DELETE: Delete // GET: /api/users/{user-id} => delete a user 
      Note: HTTP methods are not 1:1 with CRUD operations.
      // Put method deletes the old data and replaces it with new one(not partial update)
    ```
    > Don't express the technology in the URL
    ```
    Good >>>    // GET: /api/users => list of users 
    Bad  >>>    // GET: /api/users.json => list of users  
    ```
    > Shape a resouce via query paramiters.
    ```
    Pagination: limit=<value>&page=<value>
    // GET: /api/users?limit=25&page=0 => (1~25) users
    // GET: /api/users?limit=25&page=1 => (26~50) users
      Note: the default value of limit is 25 and page is 0
    ____________________________________
    Sorting: sort=<field>&order=<value>
    // GET: /api/users?sort=id&order=ASC => users ordered by id with ascending order
    // GET: /api/employees?sort=salary&order=DSC => employees ordered by salary with descending order
      Note: the default value of sort is id and order is DSC
    ____________________________________
    Filtering: <field>=<value>[&<field>=<value>&...]
    // GET: /api/users?status="active" => users with active status
    // GET: /api/employees?manager_id=10&department="Dev" => 
            users work in the dev department and their manager id is 10
   ____________________________________
    searching: search=<keywords>
    // GET: /api/users?search="software" => users meeting the search query
    ____________________________________
    partial request: partial=filed1[,field2,...]
    {
       name: "",
       username: "",
       address: {
          city: "",
          streat: "",
          country: "",
       },
       status: "",

    }
    // GET: /api/users/{user-id}?partial=username,status => {username: "", status: "",}
    // GET: /api/users/{user-id}?partial=name,address{city} => {name: "", address: {city: "",},}
    ```


- ## HEADER:
    > Req: Authorize user
    ```
    // Authorization: "user-token"  => send user token to server
    ```
    > Specify the version of api
    ```
    // Version: v2  => the second version of the api
    ```
    > Specify the content type
    ```
    // Accept: application/json  => return type is json
    // Accept: text/html => return type is html
        Note: application/json is the default value
    ```
   > Specify the accepted language
    ```
    // Accept-Language: "en"  => return english content
    // Accept-Language: "ar"  => return arabic content
        Note: "en" is the default value
    ```
   > content type
    ```
    // Content-Type: application/json  => send JSON to the server
    // Content-Type: text/html  => send HTML file to the server
    // Content-Type: text/plain  => send Plain text to the server
    // Content-Type: multipart/form-data  => send Multipart(multimedia files) file to the server
        Note: application/json is the default
    ```


- ## ERRORS:
   - 5XX => Server Errors
   - 404 => request resource not found
   - 400 => custom errors
   ```
      - each custom error has it own code
      - custom errors return in a body the error code and a message to describe it
      - backend developers & frontend developers must agree on all custom errors
   //  {
   //   code: 1225,
   //   msg: "the email address is not correct"
   //  }
   ```