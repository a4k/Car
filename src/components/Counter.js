import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import Car from './Car'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {selectDetail, deleteDetail} from '../actions/index'


// Главная страница с информацией
class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleClickDetail = this.handleClickDetail.bind(this);
    this.handleZoomPlus = this.handleZoomPlus.bind(this);
    this.handleZoomMinus = this.handleZoomMinus.bind(this);
  }


  // incrementAsync() {
  //   setTimeout(this.props.onIncrement, 1000)
  // }

  select(id, name) {
    // Добавить деталь
    this.props.selectDetail(id, name);
  }

  del(id) {
    // удалить деталь
    this.props.deleteDetail(id);
    $('#car_svg_image').find('use').each(function(){
      id = parseInt(id);
      if($(this).attr('xlink:href') == '#path' + (id + 1) + '_stroke') {
        $(this).attr({'class' : 'classA'})
      }
    })
  }

  handleClickDetail($this) {
    // Пользователь нажал на деталь
    if($this.target) {
      let e = $($this.target), isAdd = true,
        detail_id = e.attr('xlink:href').split('path')[1].split('_')[0];
        if(e.attr('xlink:href').indexOf('fill') > -1) {
          if(e.next().attr('class') == 'classA') {
            e.next().attr({'class' : 'classB'});
            isAdd = true;
          } else {
            e.next().attr({'class' : 'classA'});
            isAdd = false;
          }
        } else {
          detail_id -= 1;
          if(e.attr('class') == 'classA') {
            e.attr({'class' : 'classB'});
            isAdd = true;
          } else {
            e.attr({'class' : 'classA'});
            isAdd = false;
          }
        }

        this.props.info.map((detail, i) => {
          if(detail.id == detail_id) {
            if(isAdd) {
              this.select(detail_id, detail.name);
            } else {
              this.del(detail_id);
            }
          }
        })

        // () => {this.props.selectDetail(detail_id);}
      
      // console.log(detail_id);
      
    }
  }
  
  getList() {
    // Обработка значений из хранилища
    return this.props.details.map((detail, i) => {
      if(detail) {
         return (
           <div className="detail" key={i}>
             <div className="name">{detail.name}</div>
             <div className="deleteBtn" onClick={() => this.del(detail.id)}>x</div>
            </div>
           )
      }
    })
  }

  handleZoomPlus() {
    // Увеличение изображения
    let e = $('#car_svg_image'), x = e.width(), y = e.height(), k = 1.2;
    $('#car_svg_image').css({'width' : x*k + 'px', 'height' : y*k + 'px'});
  }
  handleZoomMinus() {
    // Уменьшение изображения
    let e = $('#car_svg_image'), x = e.width(), y = e.height(), k = 0.8;
    $('#car_svg_image').css({'width' : x*k + 'px', 'height' : y*k + 'px'});
  }


  render() {
    return (
      <div id="car_container">
        <div className="car_details">
            <Car handleClickDetail={this.handleClickDetail} />

        </div>
        <div className="car_zoom_btns">
          <button className="zoom" onClick={this.handleZoomPlus}>+</button>
          <button className="nezoom" onClick={this.handleZoomMinus}>-</button>
        </div>
        <div className="selected_details">
          {this.getList()}
        </div>
      </div>
     
    )
  }
}


// Получаем значения из хранилища
function mapStateToProps (state) {
  return {
    details: state.details,
    info: state.info,
  }
}

// Управление действиями
function matchDispatchToProps (dispatch) {
  return bindActionCreators({selectDetail: selectDetail, deleteDetail: deleteDetail}, dispatch)
}

Counter.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Counter);
