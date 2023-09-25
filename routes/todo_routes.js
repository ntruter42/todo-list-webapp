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

	const form_data = {
		title: req.flash('title')[0],
		datetime: req.flash('datetime')[0]
	}

	res.render('index', {
		nav: [
			{ link: '/', title: 'Home' },
			{ link: '/dashboard', title: 'Dashboard' },
			{ link: '/today', title: 'Today' },
			{ link: '/week', title: 'Upcoming' },
			{ link: '/month', title: 'Calender' }
		],
		title: 'Home',
		messages,
		form_data
	})
});

router.post('/new', async (req, res) => {
	const new_task = {
		user_id: 1, // user_id from session after auth
		title: req.body['new-task-title'],
		datetime: req.body['new-task-datetime']
	}

	if (new_task.title && new_task.datetime && await services.addTask(new_task)) {
		req.flash('success', 'Task successfully added!');
	} else {
		if (!new_task.title) {
			req.flash('error', 'Please enter a title');
		} else if (!new_task.datetime) {
			req.flash('error', 'Choose a due date and time');
		} else {
			req.flash('error', 'Task already exists');
		}
		req.flash('title', new_task.title);
		req.flash('datetime', new_task.datetime);
	}
	req.flash('position', 'new-task');

	res.redirect('/');
});

export default router;