const db = require('../database/dbConfig')



module.exports = {
    find,
    findBy,
    findById,
    add
}

// find all users
function find() {
    return db('users')
}

// find by 
function findBy(filter) {
    return find().where(filter)
}

// find by ID 
function findById (id) {
    return find().where({id}).first()
}

// add new users
async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}