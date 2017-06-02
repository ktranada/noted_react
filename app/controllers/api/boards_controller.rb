class Api::BoardsController < ApplicationController
  def create
    @board = Board.new(board_params)
    if @board.save
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