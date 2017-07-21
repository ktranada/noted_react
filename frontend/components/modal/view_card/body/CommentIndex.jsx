import React from 'react';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import CommentIndexItem from './CommentIndexItem';
import { getObjectById } from '../../../../reducers/selectors';
import messagesByDate from '../../../../util/messages';
import DayMessages from '../../../board_content/chat/DayMessages';

const propTypes = {
  boardId: PropTypes.number.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired
  }),
  members: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  createComment: PropTypes.func.isRequired
}


const CommentIndex = (props) => {
  const { members, boardId } = props;
  const data = messagesByDate(props.comments);

  const comments = []
  data && data.order.forEach(date => {
    comments.push(
      <DayMessages
        key={`date-${data[date][0][0].id}`}
        date={date}
        boardId={boardId}
        dayMessages={data[date]}
        members={props.members}
        contentType="description"
      />
    );
  });

  return(
    <div className="card__comments">
      <h4>Add a comment</h4>
      <CommentForm
        createComment={props.createComment}
      />
      {
        comments.length !== 0 &&
        <div className="comments__index">
          { comments }
        </div>
      }
    </div>
  )
}

CommentIndex.propTypes = propTypes;
export default CommentIndex;
