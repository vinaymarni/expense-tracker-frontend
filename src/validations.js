const isNull = (object, value) => {
    if(object == undefined || object == null || 
        value == undefined || value == null ||
        object[value] == undefined || object[value] == null || 
        object[value] == "" || object[value] == ''
    ){
        return true;
    }else{
        return false;
    }
}

export const addExpanseValidation = (expenseDetails) => {
    let error = true;

    if(isNull(expenseDetails, "categoryId")){
        error = false;
    }

    if(isNull(expenseDetails, "description")){
        error = false;
    }

    if(isNull(expenseDetails, "price")){
        error = false;
    }

    if(isNull(expenseDetails, "isActive")){
        error = false;
    }

    if(isNull(expenseDetails, "expenseDate")){
        error = false;
    }

    return error;
}