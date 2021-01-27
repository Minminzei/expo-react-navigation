import { connect } from 'react-redux';
import { Types, Actions } from '@modules/Apps';
import { Types as ProfileTypes, Data } from '@modules/Profile';
import Component from '@components/Apps';

interface StateToProps {
  initialized: boolean;
  isConnected: boolean;
  auth: Data;
  message: string | null;
}

interface DispatchToProps {
  initialize: Function;
  connected: Function;
  clearMessage: Function;
}

const mapStateToProps = (state): StateToProps => ({
  initialized: state[Types.states.initialized],
  isConnected: state[Types.states.isConnected],
  auth: state[ProfileTypes.states.data],
  message: state[Types.states.message],
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  initialize: () => dispatch(Actions[Types.actions.initialize]({})),
  connected: (isConnected:boolean) => dispatch(Actions[Types.actions.connected](isConnected)),
  clearMessage: () => dispatch({
    type: Types.actions.clearMessage,
  }),
});

export default connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
