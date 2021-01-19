import { connect } from 'react-redux';
import { Types, Actions, List } from '@modules/Events';
import Component from '@components/Events';

interface StateToProps {
  list: List;
}

interface DispatchToProps {
  fetch: Function;
}

const mapStateToProps = (state) : StateToProps => ({
  list: state[Types.states.list],
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  fetch: (data: {
    page: number;
  }) => dispatch(Actions[Types.actions.fetch](data)),
});

export default connect<StateToProps, DispatchToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
