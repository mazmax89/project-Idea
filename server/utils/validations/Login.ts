import * as validator from 'validator';


export default function validateInput(data: any) {
    let errors: any = {};
    let ifValid: boolean = false;

    if (validator.isEmpty(data.identifier)) {
        errors.identifier = 'Username is required';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required ';
    }

    if (Object.keys(errors).length === 0) {
        ifValid = true;
    }

    return {
        errors,
        isValid: ifValid,
    };
}