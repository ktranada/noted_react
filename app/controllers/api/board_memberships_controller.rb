class Api::BoardMembershipsController < ApplicationController
  def destroy
    @membership = BoardMembership.includes(:board).find(params[:id])
    if @membership.board.is_owned_by?(current_user) || @membership.user == current_user
      @membership.destroy
      ActionCable.server.broadcast("notification:#{@membership.board_id}", {
        type: 'membership',
        action: 'remove',
        membership: {
          id: @membership.id,
          board_id: @membership.board_id,
          user_id: @membership.user_id,
          username: @membership.username,
          invite_id: @membership.invite_id
        }
      })
      render :destroy
    else
      render json: ["You are not authorized to perform this action"], status: 403
    end
  end

  def update
    @membership = BoardMembership.find(params[:id])

    if @membership.update(membership_params)
      ActionCable.server.broadcast("notification:#{@membership.board_id}", {
        type: 'membership',
        action: 'update',
        membership: {
          board_id: @membership.board_id,
          user_id: @membership.user_id,
          invite_id: @membership.invite_id,
          username: @membership.username
        }
      })
      render :show
    else
      render json: @membership.errors, status: 422
    end
  end

  private

  def membership_params
    params.require(:board_membership).permit(:username)
  end
end
