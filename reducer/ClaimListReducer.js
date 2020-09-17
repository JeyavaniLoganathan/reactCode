const InitialState={
  claimList:[]
}
export default function claimListReducer(state=InitialState, action){
  console.log(action);
  switch(action.type){

   case "claimList":
   state ={claimObj:action.claimList};
   break;
  

  }
  return state;
};

