export const PasswordField = {
    label: 'Password',
    placeholder: 'Password',
    maxlength: 24,
    minlength: 8,
    pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$",
    patternError: `Must Contain 6 Characters,
        One Uppercase,
        One Lowercase,
        One Number and One Special Case Character
        `,
    maxlengthError: 'Max 24 characters',
    minlengthError: 'Min 8 characters',
    requiredError: 'Password is required',
    equalTo: 'Confirm Password does not match with New Password',
    validationError: 'Password must contain min 8 characters, one uppercase, one lowercase, one number and one special character',
}
