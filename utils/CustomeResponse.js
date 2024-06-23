class CustomResponse {

    constructor(status, message, data, errors) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}

module.exports = CustomResponse;
