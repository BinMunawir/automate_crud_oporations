import inquiries from "./inquiries.route";
import glossaries from "./glossaries.route";
import histories from "./histories.route";
import documentHistories from "./documentHistories.route";
import documents from "./documents.route";
import chapters from "./chapters.route";
import volumes from "./volumes.route";
import books from "./books.route";
import admins from "./admins.route";
import users from "./users.route";
import organizations from "./organizations.route";


export default [  ...organizations, ...users, ...admins, ...books, ...volumes, ...chapters, ...documents, ...documentHistories, ...histories, ...glossaries, ...inquiries,];