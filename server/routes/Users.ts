import * as express from 'express';
import commonValidations from '../utils/validations/Signup';
import * as bcrypt from 'bcrypt';
import  {User} from '../models/User';
import {isEmpty} from 'lodash';
import * as Promise from 'bluebird';
// імпортування залежностей

let router = express.Router(); // створення єкспресс роутеру

function validateInput(data: any, otherValidations: any) { // функція валідації данних
    let errors: any = otherValidations(data);

    return Promise.all([
        User.where({username: data.username}).fetch().then((user: any) => { // запит до БД
            if (user) { // перевірка на наявність користувача
                errors.username = 'This username already exists';
            } else {
                errors = null;
            }
        }),
    ]).then(() => {
        return {
            errors,
            isValid: isEmpty(errors), // isValid - перевірка на вміст помилок
        };
    });
}

router.post('/', (req, res) => { // обробник запиту POST
    validateInput(req.body, commonValidations).then(({errors, isValid}) => { // валідація данних
        if (isValid) { // якщо валідація пройдена
            let username: string = req.body.username;
            let password_digest: string = req.body.firstPassword;
            password_digest = bcrypt.hashSync(password_digest, 10); // шифрування пароля користувача с допомогою bcrypt
            User.forge({ // збереження до БД
                username, password_digest,
            }, {hasTimestamps: true}).save()
                .then((user: string) => res.json({success: true})) // відповідь сервера
                .catch((err: string) => res.status(500).json({error: err})); //ловимо помилки
        } else {
            res.status(400).json(errors);
        }
    });
});

export default router;