class APIError extends Error {
    constructor (statusCode, messagse="Something went wrong!", errors=[], stack=""){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = messagse
        this.success = false
        this.errors = errors
        
        // Avoid
        if (stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { APIError }