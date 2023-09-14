import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { USER_STATE_CHANGE } from "../constants";
import { db, auth } from "../../App";
export function fetchUser(){
    return ((dispatch) => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
            if(snapshot.exists){
                // console.log(snapshot.data())
                dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else{
                console.log("does not exist")
            }
        })
    })
}