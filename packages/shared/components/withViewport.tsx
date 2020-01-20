import React from 'react'
import { canUseDOM } from '../env'

export default function withViewport(ComposedComponent: any): any {
  return class WithViewport extends React.PureComponent {
    state = {
      viewport: canUseDOM
        ? { width: window.innerWidth, height: window.innerHeight }
        : { width: 1366, height: 768 }, // Default size for server-side rendering
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
      window.addEventListener('orientationchange', this.handleResize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
      window.removeEventListener('orientationchange', this.handleResize)
    }

    handleResize = () => {
      let viewport = { width: window.innerWidth, height: window.innerHeight }
      if (
        this.state.viewport.width !== viewport.width ||
        this.state.viewport.height !== viewport.height
      ) {
        this.setState({ viewport })
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} viewport={this.state.viewport} />
      )
    }
  }
}
