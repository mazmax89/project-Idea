import * as express from 'express';
import commonValidations from '../utils/validations/CreateIdea';
import  {Idea} from '../models/Idea';
import {isEmpty} from 'lodash';
import * as Promise from 'bluebird';

let router = express.Router();

function validateInput(data: any, otherValidations: any) {
    let errors: any = otherValidations(data.ideaData);
    return Promise.all([]).then(() => {
        return {
            errors,
            isValid: isEmpty(errors.errors),
        };
    });
}

router.get('/', (req, res) => {
    Idea.fetchAll().then((idea: any) => res.json({idea}))
        .catch((error: object) => res.status(500).json({error}));

});

router.post('/', (req, res) => {
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {
        if (isValid) {
            let idea_name: any = req.body.ideaData.ideaName;
            let idea_description: any = req.body.ideaData.ideaDescription;
            let user_id: any = req.body.authData.user.id;
            Idea.forge({
                user_id, idea_name, idea_description,
            }, {hasTimestamps: true}).save()
                .then((data: any) => res.json({ideaCreated: true}))
                .catch((err: string) => res.status(500).json({error: err}));
        } else {
            res.status(400).json(errors);
        }
    });
});

export default router;
