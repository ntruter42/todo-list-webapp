import { Router } from "express";
import { services } from "../index.js";

const router = Router();

router.get('/', async (req, res) => {
	const user = {
		user_id: req.session.user_id,
		full_name: req.session.full_name
	}

	const position = req.flash('position')[0];
	const messages = [
		{ type: 'info', text: req.flash('info')[0], },
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

	const tasks = await services.getTasks(user.user_id);
	tasks.map(task => {
		const date = new Date(task.due_datetime);
		const options = {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		};
		task.due_datetime = date.toLocaleDateString('en-ZA', options);
		return task;
	});

	res.render('dashboard', {
		nav: [
			{ link: '/dashboard', title: 'Dashboard' },
			{ link: '/today', title: 'Today' },
			{ link: '/week', title: 'Upcoming' },
			{ link: '/month', title: 'Calender' },
			{ link: '/logout', title: 'Logout' }
		],
		title: 'Dashboard',
		user,
		messages,
		form_data,
		tasks
	})
});

router.post('/new', async (req, res) => {
	const user = {
		user_id: req.session.user_id,
		full_name: req.session.full_name
	}

	const new_task = {
		user_id: user.user_id,
		title: req.body['new-task-title'].trim(),
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
			req.flash('error', 'The same task already exists');
			req.flash('position', 'task-list');
		}
		req.flash('title', new_task.title);
		req.flash('datetime', new_task.datetime);
	}
	req.flash('position', 'new-task');

	res.redirect('/dashboard');
});

export default router;