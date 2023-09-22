import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import session from "express-session";
import flash from "express-flash";
import "dotenv/config";

export default function App() {
	const app = express();

	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(flash());
	app.use(session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {}
	}));
	app.engine('handlebars', engine({
		defaultLayout: 'main',
		viewPath: './views',
		layoutsDir: './views/layouts'
	}));
	app.set('view engine', 'handlebars');

	return app;
}