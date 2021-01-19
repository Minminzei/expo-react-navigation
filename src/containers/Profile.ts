import { connect } from 'react-redux';
import { Types, Actions, Data } from '@modules/Profile';
import { Types as EventUsersTypes, Actions as EventUsersActions, Events } from '@modules/EventUsers';
import Component from '@components/Profile';

interface StateToProps {
  data: Data;
  events: Events;
}

interface DispatchToProps {
  save: Function;
  fetchEventsByUser: Function;
}

const mapStateToProps = (state) : StateToProps => ({
  data: state[Types.states.data],
  events: state[EventUsersTypes.states.events],
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  save: (data: Data) => dispatch(Actions[Types.actions.save](data)),
  fetchEventsByUser: (id:number) => dispatch(EventUsersActions[EventUsersTypes.actions.fetchEventsByUser](id)),
});

export default connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
