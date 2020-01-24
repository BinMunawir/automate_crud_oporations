          import auth from "./auth.routes";
import users from "./users.routes";
import notes from "./notes.routes";
import noteImages from "./noteImages.routes";


export default [...auth, ...users, ...notes, ...noteImages, ];        