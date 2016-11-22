import React from 'react';

const Router = React.createClass({

  propTypes: {
    route: React.PropTypes.string.isRequired,
    container: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    route: React.PropTypes.string.isRequired
  },

  getChildContext() {
    const route = this.props.route;
    return { route };
  },

  findSelectedComponent() {
    const { route, children } = this.props;
    return React.Children.toArray(children)
      .find((child) => child.props.name === route);
  },

  render() {
    const component = this.findSelectedComponent();
    return this.props.container(component.props.children);
  }

});

export default Router;