          import organizations from "./organizations.routes";
import users from "./users.routes";
import admins from "./admins.routes";
import books from "./books.routes";
import volumes from "./volumes.routes";
import chapters from "./chapters.routes";
import documents from "./documents.routes";
import glossaries from "./glossaries.routes";
import inquiries from "./inquiries.routes";
import auth from "./auth.routes";


export default [...organizations, ...users, ...admins, ...books, ...volumes, ...chapters, ...documents, ...glossaries, ...inquiries, ...auth, ];        