import * as express from 'express';
import  {User} from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../config';
// імпортування залежностей
let router = express.Router(); // створення єкспресс роутеру

router.post('/', (req, res) => { // обробник запиту POST
    const {identifier, password} = req.body;

    User.query({ // запит до БД
        where: {username: identifier}, // зміст запиту
    }).fetch().then((user: any) => {
        if (user) { // перевірка на вміст такого користувача
            if (bcrypt.compareSync(password, user.get('password_digest'))) {// якщо паролі співпадають
                let id: string = user.get('id');
                let username: string = user.get('username');
                let data: object = {id, username};
                const token = jwt.sign( data, config.jwtSecret);
                res.json({token});
            } else {
                res.status(401).json({errors: {form: 'Incorrect username or password'}}); // помилка
            }
        } else {
            res.status(401).json({errors: {form: 'Incorrect username or password'}}); // помилка
        }
    });
});

export default router;