class Api::InvitesController < ApplicationController
  skip_before_action :require_login!, only: [:create, :update]

  def create
    json = JSON.parse(params[:invites])
    @board_id = json["board_id"]
    data = json["invites"]

    @invites = []
    @errors = []

    data.each do |info|
      invite = Invite.new(
        board_id: @board_id,
        user_id: current_user.id,
        status: :pending,
        recipient_email: info["recipient_email"])

      if invite.save
        @invites << invite
      else
        @errors << {
          email: invite.recipient_email,
          error: invite.errors[:invite][0]
        }
      end
    end
  end

  def destroy
    begin
      invite = Invite.find(params[:id])
      invite.destroy
      render json: { id: invite.id, board_id: invite.board_id }
    rescue
      render json: "Invite does not exist", status: 422
    end
  end

  def update
    @invite = Invite.find_by_code(params[:code])

    if BoardMembership.where(board_id: @invite.board_id, username: params[:username]).length > 1
      render json: ["This username is not available. Please pick another one."], status: 422
      return
    end

    @user = User.new(user_params)
    if @user.save
      @membership = BoardMembership.new(
        board_id: @invite.board_id,
        user_id: @user.id,
        username: params[:username])

      if @membership.save
        login(@user)
        render 'api/users/show'
      end
    else
      render json: @user.errors.full_messages, status: 422
    end

  end

  private

  def invite_create_params
    params.require(:invite).permit(:board_id)
  end

  def invite_update_params
    params.require(:invite).permit(:recipient_email, :status)
  end
end
