export default function (db) {

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

	return {
		addTask,
		getTasks
	};
}