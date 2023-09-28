import bcrypt from "bcrypt";

export default function (db) {
	async function getUser(username) {
		let query = `SELECT * FROM todo.users`;

		if (!username) { return db.manyOrNone(query) }
		else { query += ` WHERE username = '${username}'` }

		return await db.oneOrNone(query);
	}

	async function addTask(new_task) {
		let query = `INSERT INTO todo.tasks (user_id, title, due_datetime)`;
		query += ` VALUES (${new_task.user_id}, '${new_task.title}', '${new_task.datetime}')`;
		query += ` ON CONFLICT (user_id, title, due_datetime) DO`;

		// Switch between the following 2 lines to return id on conflict or not
		query += ` NOTHING`;
		// query += ` UPDATE SET title = ${title}`;

		query += ` RETURNING task_id`;

		return await db.oneOrNone(query);
	}

	async function getTasks(user_id) {
		let query = `SELECT task_id, title, due_datetime FROM todo.tasks`;
		query += ` WHERE user_id = ${user_id}`;
		query += ` ORDER BY due_datetime`;

		return await db.manyOrNone(query);
	}

	async function hash(password) {
		let password_hash = '';
		while (password_hash.length !== 60) { password_hash = await bcrypt.hash(password, 10) }
		return password_hash;
	}

	async function verify(password, password_hash) {
		return await bcrypt.compare(password, password_hash);
	}

	return {
		getUser,
		addTask,
		getTasks,
		hash,
		verify
	};
}