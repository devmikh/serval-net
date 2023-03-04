import bcrypt from 'bcrypt';

async function validatePassword(password: string, hashedPassword: string) {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
}

export {
    validatePassword
}