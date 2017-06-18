class Api::BoardsController < ApplicationController
  def show
    @board = Board
      .where(id: params[:id])
      .includes(:board_memberships, :channels, lists: [cards: [:comments]])[0] ||
      Board.new

    render :show
  end


  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id

    if @board.save
      @board.create_board_membership(current_user.id, params[:board][:username])
      render :create
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
