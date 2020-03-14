import groups from "./groups.route";
import downloads from "./downloads.route";
import books from "./books.route";
import noteImages from "./noteImages.route";
import notes from "./notes.route";
import admins from "./admins.route";
import users from "./users.route";


export default [  ...users, ...admins, ...notes, ...noteImages, ...books, ...downloads, ...groups,];