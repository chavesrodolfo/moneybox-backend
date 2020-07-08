const connection = require('../database/connection');

module.exports = {

    async login(request, response) {
        const { email, password } = request.body;

        const user = await connection('users')
            .select('id', 'name', 'email')
            .where('email', '=', email)
            .andWhere('password', '=', password)
            .first();

        if (!user) {
            return response.status(400).json({ error: 'No User found with this ID' })
        }

        return response.json(user);
    }
}