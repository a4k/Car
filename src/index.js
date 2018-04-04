import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import {Provider} from 'react-redux'
import allReducers from './reducers'

const store = createStore(allReducers)
const rootEl = document.getElementById('root')

ReactDOM.render(
	<Provider store={store}>
		<Counter />
	</Provider>
  ,
  rootEl
)

