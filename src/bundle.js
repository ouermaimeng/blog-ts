/*
 * @Author: wangcaowei 
 * @Date: 2018-02-07 17:37:15 
 * @Last Modified by: wangcaowei 
 * @Last Modified time: 2018-02-07 17:37:15 
 */
import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}