const Express = require('express')
const cors = require('cors')
const knex = require('knex')


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'signin'
    }
});

const app = Express();

app.use(Express.json());
app.use(cors())

app.get('/', (req, res) => {
    db.select('*').from('users')
        .then(resp => {
            res.json(resp);
        })
})

app.post('/signin/', (req, res) => {
    const { username, password } = req.body;

    db.select('*')
        .from('users')
        .where('username', '=', username)
        .then(resp => {
            db.select('*').from('login')
                .where('email', resp[0].email)
                .then(response => {
                    if (password == response[0].password) {
                        res.json(resp[0])
                    } else {
                        res.json("Wrong password")
                    }
                })
        })
        .catch(err => res.json(err))


})

app.post('/register', (req, res) => {
    const { username, email, password } = req.body
    db.transaction(trx => {
        trx.insert({
            email: email,
            password: password
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .insert({
                        name: username,
                        username: username,
                        email: loginEmail[0]
                    })
                    .returning('*')
                    .then(resp => res.json({ status: 'success' }))
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json(err))
})

app.get('/users', (req, res) => {
    db.select('*').from('users')
        .then(resp => {
            res.json(resp);
        })
})

app.delete('/delete/:id', (req, res) => {

    db('users')
        .where('id', req.params.id)
        .del()
        .returning('email')
        .then(resp => {
            db('login')
                .where('email', resp[0])
                .del()
                .returning('email')
                .then(response => {
                    return res.json({ status: 'success' })
                })
                .catch(err => res.status(400).json({ status: 'failed' }))

        })
        .catch(err => res.status(400).json(err))
})

app.listen(5000, () => {
    console.log(`Server Running on Port 5000`)
});