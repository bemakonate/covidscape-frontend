import React from 'react';

export const createInput = ({ value, inputId, change, className, elmtConfig, type }) => {
    let inputJSX = null;
    switch (type) {
        case ('textarea'):
            inputJSX = (
                <textarea
                    {...elmtConfig}
                    className={className}
                    onChange={event => change({ inputId, event })}
                    value={value}>

                </textarea>
            )
            break;
        default:
            inputJSX = <input
                {...elmtConfig}
                className={className}
                value={value}
                onChange={event => change({ inputId, event })} />
    }
    return inputJSX;
};

export const removeFields = (formConfig, removeFields) => {
    const newFormConfig = [];
    formConfig.forEach(field => {
        let passField = true;
        removeFields.forEach(removeField => {
            if (field.id === removeField) {
                passField = false;
            }
        })
        if (passField) {
            newFormConfig.push(field);
        }
    })

    return newFormConfig;
}

//Add needed properites for each input elment
export const createFormConfig = (defaultConfig) => {
    const newFormConfig = [];
    defaultConfig.forEach(input => {
        newFormConfig.push({
            ...input,
            touched: input.value ? true : false,
            valid: false,
            errorMsg: '',
            value: input.value ? input.value : '',
        })
    })

    return newFormConfig;
}

//Get only the values of the form
export const createFormValues = (defaultConfig) => {
    const newForm = {};
    defaultConfig.forEach(input => {
        let inputVal = '';
        if (input.value) {
            inputVal = input.value;
        }
        newForm[input.id] = inputVal;
    })

    return newForm;
}


//Update the config for the form elements when input is changed
export const updateFormConfig = ({ formConfig, inputId, event }) => {
    const newFormConfig = formConfig.map(input => {
        if (input.id === inputId) {
            return { ...input, touched: true, value: event.target.value }
        }
        return input;
    });
    return newFormConfig;
}


//update the values of the form when input is changed
export const updateFormValues = ({ form, inputId, event }) => {
    return { ...form, [inputId]: event.target.value }
}

//Check if inputs is valid when form change
export const updateFormConfigValidity = (formConfig) => {
    const newFormConfig = formConfig.map(input => {
        const inputValidity = checkValidity(input.value, input.rules);
        return {
            ...input,
            valid: inputValidity.isValid,
            errorMsg: inputValidity.validErrorMsgs[0]
        }
    })
    return newFormConfig;
}


//If the whole entire form should be passed
export const updateIsWholeFormValid = (formConfig) => {
    let isFormValid = true;
    formConfig.forEach(input => {
        isFormValid = isFormValid && input.valid;
    })
    return isFormValid;
}



export function checkValidity(value, rules, form) {
    let isValid = true;
    const validErrorMsgs = [];
    if (!rules) {
        return { isValid, validErrorMsgs };
    }
    const isRequired = (value) => value.trim() !== '';
    const isMinLength = (value, minLength = rules.minLength) => value.length >= minLength;
    const hasUpperCase = (str) => (/[A-Z]/.test(str));
    const hasNumber = (myString) => /\d/.test(myString);
    const isEmail = (value) => {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return pattern.test(value)
    }

    if (rules.required) {
        const rule = isRequired(value)
        isValid = rule && isValid;
        if (!rule) {
            validErrorMsgs.push('This field is required')
        }
    }
    if (rules.minLength) {
        const rule = isMinLength(value);
        isValid = rule && isValid;
        if (!rule) {
            validErrorMsgs.push(`There is a minimum length of ${rules.minLength}`)
        }
    }

    if (rules.isEmail) {
        const rule = isEmail(value);
        isValid = rule && isValid;
        if (!rule) {
            validErrorMsgs.push(`Please enter a valid email`)
        }
    }

    if (rules.strongPassword) {
        const rule = isMinLength(value, 6) && hasUpperCase(value) && hasNumber(value);
        isValid = rule && isValid;
        if (!rule) {
            validErrorMsgs.push(`Password must be at least 6 characters, and have a uppercase letter, and at least one number`)
        }
    }

    // if (rules.match) {
    //     const rule = value === form[rules.match].value;
    //     isValid = rule && isValid;
    //     if (!rule) {
    //         validErrorMsgs.push(`Confirm Password must match with password`)
    //     }
    // }

    return { isValid, validErrorMsgs };
}
