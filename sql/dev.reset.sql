DROP TABLE IF EXISTS todo.tasks;
DROP TABLE IF EXISTS todo.users;

CREATE TABLE todo.users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	full_name VARCHAR(255) NOT NULL,
	password VARCHAR(60) NOT NULL
);

CREATE TABLE todo.tasks (
	task_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES todo.users(user_id) ON DELETE CASCADE,
	title VARCHAR(255) NOT NULL,
	due_datetime timestamp,
	UNIQUE (user_id, title, due_datetime)
);

INSERT INTO todo.users (username, full_name, password) VALUES ('ntruter42', 'Nicholas Truter', '$2b$10$cxK.emL.AHc7XzMf5fVaTe5gFjNblOowr71YC.qFN4UJvZ902VKzG');
INSERT INTO todo.users (username, full_name, password) VALUES ('emusk69', 'Elon Musk', '$2b$10$aTEFSH3iQnefKPT9L3cOFuiEYyzcaKqh9JsiQElcjB2d.Uyrdhu96');

INSERT INTO todo.tasks (user_id, title, due_datetime) VALUES (1, 'Go to the shop', '2023-09-30T15:00');
INSERT INTO todo.tasks (user_id, title, due_datetime) VALUES (2, 'Start a company', '2024-01-01T04:20');
INSERT INTO todo.tasks (user_id, title, due_datetime) VALUES (1, 'Collect meds', '2023-10-04T09:45');
INSERT INTO todo.tasks (user_id, title, due_datetime) VALUES (1, 'Get a job', '2024-01-01T07:30');
INSERT INTO todo.tasks (user_id, title, due_datetime) VALUES (2, 'Go to Mars', '2035-03-15T16:20');