// import React from 'react'
export var initialState = false;

export const reducer = (state, action) => {
  if (action.type === "USER"){
    const data = action.payload; 
    window.localStorage.setItem('STATUS_OF_LOGIN', JSON.stringify(data))
    return data;
  }
  return state;
}




