import { connect } from 'react-redux';
import { Types, Actions, List, Data } from '@modules/Users';
import Component from '@components/Users';

interface StateToProps {
  list: List;
  data: Data | null;
}

interface DispatchToProps {
  get: Function;
  fetch: Function;
}

const mapStateToProps = (state) : StateToProps => ({
  list: state[Types.states.list],
  data: state[Types.states.data],
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  get: (id:number) => dispatch(Actions[Types.actions.get](id)),
  fetch: (data: {
    page: number;
  }) => dispatch(Actions[Types.actions.fetch](data)),
});

export default connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
