class Api::BoardMembershipsController < ApplicationController
  def destroy
    @membership = BoardMembership.to_destroy(params[:id])
    if !@membership.nil? && (@membership.board.is_owned_by?(current_user) || @membership.user == current_user)
      MembershipRemovalJob.perform_now(current_user, @membership)
      @membership.destroy
      render :destroy
    else
      render json: ["You are not authorized to perform this action"], status: 403
    end
  end

  def update
    @membership = BoardMembership.find(params[:id])

    if @membership.update(membership_params)
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
