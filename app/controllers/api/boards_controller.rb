class Api::BoardsController < ApplicationController
  skip_before_action :confirm_board_membership, only: [:create]

  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id

    membership = BoardMembership.new(username: params[:board][:username])

    if !membership.valid? && membership.errors[:username].any?
      render json: { username: membership.errors[:username][0] }, status: 422
      return
    end

    if @board.save
      @membership = @board.create_owner_membership(params[:board][:username])
      render :create
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def show
    @board = Board
      .includes(:board_memberships, :members, :invites, :channels)
      .find(params[:id])

    @isOwner = @board.is_owned_by?(current_user)
    @subscriptions = Subscription.includes(channel: [:messages]).where(board_id: params[:id], user_id: current_user.id)
    if @isOwner
      @invites = @board.invites.select {|invite| !invite.hide_from_client? }
    end
    render :show
  end


  def update
    @board = Board.find(params[:id])

    if @board.update(board_params)
      ActionCable.server.broadcast("board_name:#{@board.id}",
        type: 'board',
        action: 'update',
        board: {
          id: @board.id,
          title: @board.title
        },
        updated_by: current_user.id
      )
      render json: { id: @board.id, title: @board.title }
    else
      render json: {}, status: 422
    end
  end


  def destroy
    @board = Board.find(params[:id])
    memberships = BoardMembership.includes(board: [:members, :invites, lists: [cards: [:comments]], channels: [:messages]]).where(id: @board.board_membership_ids)

    memberships.each do |mbs|
      MembershipRemovalJob.perform_now(current_user, mbs)
    end

    @board.destroy

    render json: {}
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
