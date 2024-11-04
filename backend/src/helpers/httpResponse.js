export const ok = (body) => {    
        return{
            success: true,
            statusCode: 200,
            body            
        }

}

export const notFound =  () => {
    return{
        success: false,
        statusCode: 400,
        body: 'Not found'
    }
}

export const serverError = (error) => {
    return {
        success: true,
        statusCode: 200,
        body: error
    }
}