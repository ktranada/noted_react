class Api::BoardsController < ApplicationController
  def show
    @board = Board
      .includes(:board_memberships, :members, :invites, :channels, lists: [cards: [:comments]])
      .find(params[:id])

    @invites = @board.invites.select {|invite| !invite.hide_from_client? }
    render :show
  end


  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id

    if @board.save
      @board.create_owner_membership(params[:board][:username])
      render :create
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def update
    @board = Board.find(params[:id])

    if @board.update(board_params)
      render json: { id: @board.id, title: @board.title }
    else
      render json: {}, status: 422
    end
  end


  def destroy
    @board = Board.includes(:channels, :members, :invites, lists: [cards: [:comments]]).find(params[:id])

    @board.destroy

    render :destroy
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
