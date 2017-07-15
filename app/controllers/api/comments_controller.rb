class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      ActionCable.server.broadcast("board:#{params[:comment][:board_id]}",
        type: 'comment',
        action: 'add',
        comment: {
          id: @comment.id,
          card_id: @comment.card_id,
          user_id: @comment.user_id,
          description: @comment.description,
        },
        updated_by: params[:comment][:updated_by]
      )
      render :create
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:card_id, :description)
  end
end
