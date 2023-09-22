import { Router } from "express";
import { services } from "../index.js";

const router = Router();

router.get('/', async (req, res) => {
	res.render('index', {
		nav: [
			{ link: '/', title: 'Home' },
			{ link: '/dashboard', title: 'Dashboard' },
			{ link: '/today', title: 'Today' },
			{ link: '/week', title: 'Upcoming' },
			{ link: '/month', title: 'Calender' }
		],
		title: 'Home',
		message: { type: 'info', text: 'Schema Name: ' + await services.schemaName() },
	})
});

export default router;