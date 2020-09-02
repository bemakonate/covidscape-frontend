import { enforceFormat, formatToPhone } from '../../constants/helpers';
const formConfig = [
    {
        id: 'firstName',
        label: 'First Name',
        elmtConfig: { placeholder: 'first name' },
        rules: { required: true }
    },
    {
        id: 'lastName',
        label: 'Last Name',
        elmtConfig: { placeholder: "last name" },
        rules: { minLength: 3, required: true },
    },
    {
        id: 'phoneNum',
        label: 'Phone Num',
        elmtConfig: {
            onKeyDown: enforceFormat,
            onKeyUp: formatToPhone,
            placeholder: '(222) 222 2222',
        },
        rules: { minLength: 16 }
    },
    {
        id: 'email',
        label: 'Email',
        elmtConfig: { placeholder: 'email', type: 'email' },
        rules: { isEmail: true }
    },
    {
        id: 'address',
        label: 'Address',
        elmtConfig: { placeholder: 'address' }
    }
]

export default formConfig;