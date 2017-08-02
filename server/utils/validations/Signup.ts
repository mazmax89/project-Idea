import * as validator from 'validator';


export default function validateInput(data: any) { // фунція валідації даних
    let errors: any = {};
    let ifValid: boolean = false;

    if (validator.isEmpty(data.username)) { // перевірка на вміст поля 'username'
        errors.username = 'Username is required';
    }
    if (validator.isEmpty(data.firstPassword)) {// перевірка на вміст поля 'firstPassword'
        errors.firstPassword = 'This field is required ';
    }
    if (validator.isEmpty(data.confirmPassword)) {// перевірка на вміст поля 'confirmPassword'
        errors.confirmPassword = 'This field is required ';
    }
    if (!validator.equals(data.firstPassword, data.confirmPassword)) {// перевірка на однаковість пароля
        errors.confirmPassword = 'Password must match';
    }

    if (Object.keys(errors).length === 0) { // якщо все вірно - повертаємо
        ifValid = true;
    }

    return {// якщо все вірно - повертаємо 'errors', 'isValid'
        errors,
        isValid: ifValid,
    };
}