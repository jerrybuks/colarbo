const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //if its null or undefined, it gets set an empty string
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, {
            min: 2,
            max: 40
        })) {
        errors.handle = 'Handle needs to be between 2 and 4 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'status field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'skills field is required';
    }

    if (!isEmpty(data.website)) {
        //if is not empty, we check to make sure its a URl
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL'
        }
    }

    if (!isEmpty(data.youtube)) {

        //if is not empty, we check to make sure its a URl
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL'
        }
    }

    if (!isEmpty(data.twitter)) {
        //if is not empty, we check to make sure its a URl
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL'
        }
    }

    if (!isEmpty(data.facebook)) {
        //if is not empty, we check to make sure its a URl
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.instagram)) {
        //if is not empty, we check to make sure its a URl
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL'
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};