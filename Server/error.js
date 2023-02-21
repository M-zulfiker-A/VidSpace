export const createError= (Status , message)=>{
    const err = new Error()
    err.status = Status
    err.message = message
    return err
}