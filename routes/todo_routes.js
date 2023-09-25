import { Router } from "express";
import { services } from "../index.js";

const router = Router();

router.get('/', async (req, res) => {
	const position = req.flash('position')[0];
	const messages = [
		{ type: 'info', text: req.flash('info')[0] },
		{ type: 'error', text: req.flash('error')[0] },
		{ type: 'warning', text: req.flash('warning')[0] },
		{ type: 'success', text: req.flash('success')[0] }
	].map(message => {
		if (message.text) {
			message.position = position;
		}
		return message;
	});

	res.render('index', {
		nav: [
			{ link: '/', title: 'Home' },
			{ link: '/dashboard', title: 'Dashboard' },
			{ link: '/today', title: 'Today' },
			{ link: '/week', title: 'Upcoming' },
			{ link: '/month', title: 'Calender' }
		],
		title: 'Home',
		messages
	})
});

router.post('/new', async (req, res) => {
	// req.flash('info', 'You clicked the ADD button');
	req.flash('error', 'No task was added');
	// req.flash('warning', 'Do not worry');
	// req.flash('success', 'This is just a test message');
	req.flash('position', 'new-task');
	res.redirect('/');
});

export default router;