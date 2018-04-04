import {combineReducers} from 'redux'
import DetailsReducers from './details'
import SDetails from './detailsHandle'

const allReducers = combineReducers({
	details: SDetails,
	info: DetailsReducers,
});

export default allReducers
/*
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
*/