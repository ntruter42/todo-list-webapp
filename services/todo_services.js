export default function (db, schema) {

	async function schemaName() {
		const query = `${schema}`;
		return query;
	}

	return {
		schemaName
	};
}