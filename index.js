import app_setup from "./config/app.js";
import db_config from "./config/database.js";
import todo_services from "./services/todo_services.js";
import auth_routes from "./routes/auth_routes.js";
import todo_routes from "./routes/todo_routes.js";

const app = app_setup();
const db = db_config();
const services = todo_services(db);

app.use('/', auth_routes);
app.use('/dashboard', todo_routes);

export { services };

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App started on PORT: ${PORT}`);
});