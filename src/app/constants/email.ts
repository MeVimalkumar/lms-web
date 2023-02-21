export const EmailField = {
    label: 'Email Address',
    placeholder: 'Email Address',
    maxlength: 255,
    minlength: 1,
    pattern: '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*',
    patternError: 'Invalid Email',
    maxlengthError: 'Max 255 characters',
    minlengthError: 'Min 1 characters',
    requiredError: 'Email Address is required',
}
