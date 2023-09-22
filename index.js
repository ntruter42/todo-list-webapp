import app_setup from "./config/app.js";
import db_config from "./config/database.js";
import todo_services from "./services/todo_services.js";
import todo_routes from "./routes/todo_routes.js";

const app = app_setup();
const db = db_config();
const services = todo_services(db, process.env.NODE_ENV);

app.use('/', todo_routes);

export { services };

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});