import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {selectDetail} from '../actions/index'

// Список деталей
class Details extends Component {
	getList() {
		// Обработка значений из хранилища
		// return this.props.details.map((detail_id, i) => {
		// 	return (
		// 		<li key={detail_id}>{detail_id}</li>
		// 		)
		// })
		console.log(this.props.details);
		return (
			<div className="detail_item">{this.props.details}</div>
			)
	}
	render() {
		return (
			<ul className="selected_details">
				{this.getList()}
			</ul>
			)
	}
}

// Получаем значения из хранилища
function mapStateToProps (state) {
	console.log('kk' + state);
	return {
		details: state.details
	}
}

// Управление действиями
function matchDispatchToProps (dispatch) {
  return bindActionCreators({selectDetail: selectDetail}, dispatch)
}


export default connect(matchDispatchToProps, mapStateToProps)(Details);