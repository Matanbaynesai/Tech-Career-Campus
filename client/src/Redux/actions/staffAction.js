import { GET_STAFF_LIST, ADD_STAFF, DELETE_STAFF, STAFF_ERRORS, UPDATE_STAFF } from "./types";
import fetcher from "../../utils/fetcher";

export const getStaff = () => async dispatch => {
    await fetcher('http://localhost:8080/api/staff')
        .then((response) => dispatch({
            type: GET_STAFF_LIST,
            payload: response.data,
        }
        ))
        .catch((err) => console.log(err));
}

export const addStuff = (staff,file) => async dispatch => {
    const data= new FormData()
    data.append('profileImg', file)
    data.append('registeredAs',staff.registeredAs)
    data.append('firstName',staff.firstName||"")
    data.append('lastName',staff.lastName||"")
    data.append('email',staff.email||"")
    data.append('password',staff.password||"")
    data.append('age',staff.age||"")
    data.append('jod',staff.jod||"")
    data.append('responsible',staff.responsible||"")
    data.append('phone',staff.phone||"")
    console.log(staff.age)
    try {
        await fetch(`http://localhost:8080/api/register`, {
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })

            .then((res) => res.json())

            .then((response) => {
                if (!response.data) throw response
                return response
            })
            .then((response) => dispatch({
                type: ADD_STAFF,
                payload: response.data,
            }
            ))
            .catch(error => { throw error })
    }
    catch (error) {
        dispatch({ type: STAFF_ERRORS, payload: error.errors || error })
    }

}
export const deleteStaff = (staffId) => async dispatch => {
    debugger
    try {
        await fetcher('/api/staff', {
            method: 'DELETE',
            body: JSON.stringify({
                id: staffId
            }),
        })
            .then((response) => dispatch({
                type: DELETE_STAFF,
                payload: response.data,
            }
            ))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }

}

export const updateStaff = (updateStaff) => async dispatch => {
    debugger
    const id = updateStaff._id;
    await fetcher(`http://localhost:8080/api/staff/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateStaff)
    })
        .then(response => dispatch({
            type: UPDATE_STAFF,
            payload: response.data
        }))
        .catch(error => console.log(error))
}