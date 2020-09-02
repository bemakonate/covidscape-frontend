import React, { useState, useEffect } from 'react';
import formDefaultConfig from './contactFormConfig';
import {
    createFormConfig,
    createFormValues,
    updateFormConfigValidity,
    updateFormConfig,
    updateFormValues,
    createInput,
    updateIsWholeFormValid
} from '../../constants/form-helpers'



const Contact = () => {

    const [form, setForm] = useState(null); //form values, represents values
    const [formConfig, setFormConfig] = useState(null); //form elements, store actual values of the form
    const [isWholeFormValid, setIsWholeFormValid] = useState(true);
    let errorMsgs = null;

    if (formConfig) {
        const invalidInputs = formConfig.filter(input => input.errorMsg && input.touched);
        errorMsgs = invalidInputs.map(input => {
            return {
                errorMsg: input.errorMsg,
                label: input.label
            }
        });
    }

    //compentDidMount || Create the form values and form config
    useEffect(() => {
        const newForm = createFormValues(formDefaultConfig);
        const newFormConfig = createFormConfig(formDefaultConfig);

        setForm(newForm);
        setFormConfig(newFormConfig);
    }, []);

    //update form validity values
    useEffect(() => {
        if (formConfig) {
            const newFormConfig = updateFormConfigValidity(formConfig);
            setFormConfig(newFormConfig);
        }

    }, [form])


    useEffect(() => {
        if (formConfig) {
            const isFormValid = updateIsWholeFormValid(formConfig);
            setIsWholeFormValid(isFormValid);
        }
    }, [formConfig])



    //Change the form input to be assigned as touched by user
    const handleChange = ({ inputId, event }) => {
        const newFormConfig = updateFormConfig({ formConfig: formConfig, inputId: inputId, event: event });
        const newForm = updateFormValues({ form: form, inputId: inputId, event: event });

        setForm(newForm);
        setFormConfig(newFormConfig);
    };



    const contactRow = ({ label, id, ...props }) => {
        return (
            <tr className={`contact-row ${props.touched && (!props.valid) ? 'error' : ''}`}>
                <td className="contact-label">{label} {(props.rules && props.rules.required) ? <span>*</span> : null}</td>
                <td className="contact-input-wrapper">
                    {createInput({
                        change: handleChange,
                        className: "contact-input",
                        inputId: id,
                        ...props
                    })}
                </td>
            </tr>
        )
    }



    return (
        <table className="checkout__contact-form">
            <tbody>
                {formConfig && formConfig.map((rowConfig, index) => (
                    <React.Fragment key={index}>{contactRow(rowConfig)}</React.Fragment>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2">
                        <ul>
                            {errorMsgs && errorMsgs.map((input, index) => {
                                return <li key={index}>"{input.label}" {input.errorMsg} </li>
                            })}
                        </ul>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Contact
