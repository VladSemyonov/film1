const setValue = {
    text: value => value,
    number: value => {
        let parsedValue = parseFloat(value);
        parsedValue = isNaN(parsedValue) || parsedValue === 0 ? '' : Math.abs(parsedValue)

        return parsedValue
    },
    checkBox: value => value,
    email: value => value,
    textarea: value => value,
    password: value => value,
}

const setFormObject = (data, fn) => ({target}) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    return fn({...data, [target.name]: setValue[target.type](value)})
}

export default setFormObject
