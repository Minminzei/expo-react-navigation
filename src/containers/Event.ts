import { connect } from 'react-redux';
import { Types, Actions, Data } from '@modules/Events';
import {
  Types as EventUsersTypes, Actions as EventUsersActions,
  Users, Data as EventUser,
} from '@modules/EventUsers';
import { Types as ProfileTypes, Data as Auth } from '@modules/Profile';
import Component from '@components/Event';

interface StateToProps {
  data: Data;
  users: Users;
  auth: Auth;
}

interface DispatchToProps {
  get: Function;
  save: Function;
  delete: Function;
  fetchUsersByEvent: Function;
}

const mapStateToProps = (state) : StateToProps => ({
  data: state[Types.states.data],
  users: state[EventUsersTypes.states.users],
  auth: state[ProfileTypes.states.data],
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  get: (id:number) => dispatch(Actions[Types.actions.get](id)),
  save: (data: EventUser) => dispatch(EventUsersActions[EventUsersTypes.actions.save](data)),
  delete: (id:number) => dispatch(EventUsersActions[EventUsersTypes.actions.delete](id)),
  fetchUsersByEvent: (id:number) => dispatch(EventUsersActions[EventUsersTypes.actions.fetchUsersByEvent](id)),
});

export default connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
