class Api::BoardsController < ApplicationController
  def create
    @board = Board.new(user_id: current_user.id, title: params[:title])
    if @board.save
      @board.create_board_membership(current_user.id, params[:username])
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  private

  def board_params
    params.require(:board).permit(:title)

  end
end
