class Api::BoardsController < ApplicationController
  skip_before_action :confirm_board_membership, only: [:create]

  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id

    membership = BoardMembership.new(username: params[:board][:username])

    if !membership.valid? && membership.errors[:username].any?
      render json: { username: membership.errors[:username][0] }, status: 422
      return;
    end

    if @board.save
      @board.create_owner_membership(params[:board][:username])
      render :create
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def show
    @board = Board
      .includes(:board_memberships, :members, :invites, :channels, lists: [cards: [:comments]])
      .find(params[:id])

    @subscriptions = Subscription.includes(channel: [:messages]).where(board_id: params[:id], user_id: current_user.id)
    @invites = @board.invites.select {|invite| !invite.hide_from_client? }
    render :show
  end


  def update
    @board = Board.find(params[:id])

    if @board.update(board_params)
      ActionCable.server.broadcast("board:#{@board.id}",
        type: 'board',
        action: 'update',
        board: {
          id: @board.id,
          title: @board.title
        },
        updated_by: params[:comment][:updated_by]
      )
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
