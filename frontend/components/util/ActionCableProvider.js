import React from 'react';
import merge from 'lodash/merge';
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
  unsubscribeOnUmount: PropTypes.bool,
  shouldUnsubscribe: PropTypes.bool,
  trackedProps: PropTypes.object
}

const actionCableDefaultProps = {
  unsubscribeOnUmount: false,
  shouldUnsubscribe: false,
  trackedProps: null
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
        onRejected = _props.onRejected,
        shouldUnsubscribe = _props.shouldUnsubscribe;

    const subscription = this.context.cable.subscriptions.subscriptions.find(({channelInfo}) => {
      return  (channelInfo.room === this.props.channel.room
               && channelInfo.channel === this.props.channel.channel)
    });

    if (subscription === undefined) {
      if (shouldUnsubscribe) {
        return;
      }
      this.cable = this.context.cable.subscriptions.create(
        this.props.channel,
        {
          received(data) {
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
          },
          channelInfo: this.props.channel,
        }
      )
    } else {
      this.cable = subscription;


      if (shouldUnsubscribe) {
        this.unsubscribe();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUnsubscribe) {
      this.unsubscribe();
    }
  }

  componentWillUnmount() {
    if (this.props.unsubscribeOnUmount && this.cable) {
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

  unsubscribe() {
    if (this.cable) {
      this.context.cable.subscriptions.remove(this.cable)
      this.cable = null
    }
  }

  removeBoardSubscriptions(boardId) {
    const cableSubscriptions = this.context.cable.subscriptions;
    const boardSubscriptions = cableSubscriptions.subscriptions.filter(sub => sub.channelInfo.board_id == boardId);
    boardSubscriptions.forEach(subscription => cableSubscriptions.remove(subscription));
  }

  render() {
    return null
  }

}


ActionCable.propTypes = actionCablePropTypes;
ActionCable.defaultProps = actionCableDefaultProps;
ActionCable.contextTypes = contextTypes;



exports.ActionCable = ActionCableProvider.ActionCable = ActionCable

// ActionCableProvider.ActionCable = ActionCable;
// export ActionCable;

export default ActionCableProvider;
