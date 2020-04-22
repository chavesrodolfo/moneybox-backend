const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('targets').count();

        const targets = await connection('targets')
            .join('users', 'users.id', '=', 'targets.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'targets.*',
                'users.name',
                'users.email'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(targets);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const user_id = request.headers.authorization;

        const created_at = new Date();

        const [id] = await connection('targets').insert({
            title,
            description,
            value,
            user_id,
            created_at
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const targets = await connection('targets')
            .select('user_id')
            .where('id', id)
            .first();

        if (targets.user_id !== user_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('targets')
            .where('id', id)
            .delete();

        return response.status(204).send();
    }
}