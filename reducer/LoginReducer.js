const InitialState={
  loggedUsername:""
}
export default function loginReducer(state=InitialState, action){
  switch(action.type){
  case "login":
    state=action.loggedUsername;
    break;
  }
  return state;
}