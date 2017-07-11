import React from 'react';
import actioncable from 'actioncable';
import PropTypes from 'prop-types';
Object.defineProperty(exports, "__esModule", {
  value: true
});


const actionCableProviderPropTypes = {
  cable: PropTypes.object,
  url: PropTypes.string,
  children: PropTypes.any
}

const childContextTypes = {
  cable: PropTypes.object.isRequired
}

class ActionCableProvider extends React.Component {
  getChildContext() {
    return {
      cable: this.cable
    }
  }

  componentWillMount() {
    if (this.props.cable) {
      this.cable = this.props.cable
    } else {
      this.cable = actioncable.createConsumer(this.props.url)
    }
  }

  componentWillUnmount() {
    if (!this.props.cable && this.cable) {
      this.cable.disconnect()
    }
  }

  componentWillReceiveProps(nextProps) {
    // Props not changed
    if (this.props.cable === nextProps.cable &&
        this.props.url === nextProps.url) {
      return
    }

    // cable is created by self, disconnect it
    this.componentWillUnmount()

    // create or assign cable
    this.componentWillMount()
  }

  render() {
    return this.props.children
  }
}

ActionCableProvider.propTypes = actionCableProviderPropTypes;
ActionCableProvider.childContextTypes = childContextTypes;

const actionCablePropTypes = {
  onReceived: PropTypes.func,
  onInitialized: PropTypes.func,
  onConnected: PropTypes.func,
  onDisconnected: PropTypes.func,
  onRejected: PropTypes.func,
}

const contextTypes = {
  cable: PropTypes.object.isRequired
}

class ActionCable extends React.Component {
  componentDidMount() {
    let self = this;
    let _props = this.props,
        onReceived = _props.onReceived,
        onInitialized = _props.onInitialized,
        onConnected = _props.onConnected,
        onDisconnected = _props.onDisconnected,
        onRejected = _props.onRejected;

    this.cable = this.context.cable.subscriptions.create(
      this.props.channel,
      {
        received: function(data) {
          onReceived && onReceived(data)
        },
        initialized() {
          onInitialized && onInitialized()
        },
        connected() {
          onConnected && onConnected()
        },
        disconnect() {
          onDisconnected && onDisconnected()
        },
        rejected() {
          onRejected && onRejected()
        }
      }
    )
  }

  componentWillUnmount() {
    if (this.cable) {
      this.context.cable.subscriptions.remove(this.cable)
      this.cable = null
    }
  }

  send(data) {
    if (!this.cable) {
      throw new Error('ActionCable component unloaded')
    }

    this.cable.send(data)
  }

  perform(action, data) {
    if (!this.cable) {
      throw new Error('ActionCable component unloaded')
    }

    this.cable.perform(action, data)
  }

  render() {
    return null
  }
}


ActionCable.propTypes = actionCablePropTypes;
ActionCable.contextTypes = contextTypes;



exports.ActionCable = ActionCableProvider.ActionCable = ActionCable

// ActionCableProvider.ActionCable = ActionCable;
// export ActionCable;

export default ActionCableProvider;
