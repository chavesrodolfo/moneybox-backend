const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const user_id = request.headers.authorization;

        const targets = await connection('targets')
            .select('*')
            .where('user_id', user_id);

        return response.json(targets);
    }
}