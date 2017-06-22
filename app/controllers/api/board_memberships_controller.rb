class Api::BoardMembershipsController < ApplicationController
  def destroy
    @membership = BoardMembership.includes(:board).find(params[:id])
    if @membership.board.is_owned_by?(current_user)
      @membership.destroy
      render :destroy
    else
      render json: ["You are not authorized to perform this action"], status: 422
    end
  end
end
