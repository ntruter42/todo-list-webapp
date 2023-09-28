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
		username: req.flash('form_data_username')[0],
		password: req.flash('form_data_password')[0]
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

router.post('/login', async (req, res) => {
	const user = await services.getUser(req.body['login-username']);

	if (user && await services.verify(req.body['login-password'], user.password)) {
		req.session.user_id = user.user_id;
		req.session.username = user.username;
		req.session.full_name = user.full_name;
	} else {
		req.flash('error', "The username or password entered is incorrect");
	}
	req.flash('position', "login");

	res.redirect('/');
});

router.get('/logout', async (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	});
});

export default router;