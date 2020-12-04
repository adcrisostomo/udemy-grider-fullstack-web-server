const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default emails => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim()) // for every trimmed email, pass it to filter()
        .filter(email => emailRegex.test(email) === false) // store invalid emails to invalidEmails
    
    if (invalidEmails.length) {
        return `These email addresses are invalid: ${invalidEmails}`
    }

    return
}