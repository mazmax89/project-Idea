import * as validator from 'validator';
import {isEmpty} from 'lodash';


export default function validateInput(data: any) {
    let errors: any = {};
    if (validator.isEmpty(data.ideaName)) {
        errors.ideaName = 'Please type some name of idea';
    }
    if (validator.isEmpty(data.ideaDescription)) {
        errors.ideaDescription = 'Please add some description of idea';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
}