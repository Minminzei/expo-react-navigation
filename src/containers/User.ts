import { connect } from 'react-redux';
import { Types, Actions, Data } from '@modules/Users';
import { Types as EventUsersTypes, Actions as EventUsersActions, Events } from '@modules/EventUsers';
import Component from '@components/User';

interface StateToProps {
  data: Data;
  events: Events;
}

interface DispatchToProps {
  get: Function;
  fetchEventsByUser: Function;
}

const mapStateToProps = (state) : StateToProps => ({
  data: state[Types.states.data],
  events: state[EventUsersTypes.states.events],
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  get: (id:number) => dispatch(Actions[Types.actions.get](id)),
  fetchEventsByUser: (id:number) => dispatch(EventUsersActions[EventUsersTypes.actions.fetchEventsByUser](id)),
});

export default connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
