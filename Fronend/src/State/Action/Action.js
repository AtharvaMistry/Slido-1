export const ApprovedCustomers = (value) => {
    return (dispatch) => {
        dispatch({
            type: 'addition',
            payload: value
        })
    }
}


