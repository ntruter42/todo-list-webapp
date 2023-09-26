import { Router } from "express";
import { services } from "../index.js";

const router = Router();

router.get('/', (req, res) => {
	if (!req.session.user_id) {
		res.redirect('/login');
	} else {
		res.redirect('/dashboard');
	}
});

router.get('/login', async (req, res) => {
	const form_data = {
		title: req.flash('title')[0],
		datetime: req.flash('datetime')[0]
	}

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

	res.render('login', {
		nav: [
			{ link: '/dashboard', title: 'Dashboard' },
			{ link: '/signup', title: 'Sign Up' }
		],
		title: 'Login',
		messages,
		form_data
	})
});

export default router;