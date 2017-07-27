

'use strict';
import {combineReducers}from 'redux'



 import { MainNavigator } from '../app/App.js';


function nav(state, action) {
  let nextState;
  switch (action.type) {
    
    default:
      nextState = MainNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}


const rootReducers = combineReducers({
     nav
});

export default rootReducers;
