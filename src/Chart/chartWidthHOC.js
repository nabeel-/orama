// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {throttle} from 'lodash'

// this component wraps <BaseComponent /> and adds a width prop when it's not present
export default function chartWidthHOC(BaseComponent) {
  return class ChartWidthHOC extends React.Component {
    static propTypes = {
      width: PropTypes.number,
    }

    static displayName = 'ChartWidthHOC'

    state = {}

    componentWillReceiveProps() {
      this.updateWidth()
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
      this.updateWidth()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }

    updateWidth = () => {
      if (this.divNode && !this.props.width) {
        const width = this.divNode.clientWidth
        if (this.state.width !== width) {
          this.setState({width})
        }
      }
    }

    handleResize = throttle(this.updateWidth, 500)

    handleRef = divNode => {
      this.divNode = divNode
    }

    render() {
      return (
        <div ref={this.handleRef}>
          <BaseComponent {...this.state} {...this.props} />
        </div>
      )
    }
  }
}