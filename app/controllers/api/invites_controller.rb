class Api::InvitesController < ApplicationController
  skip_before_action :require_login!, only: [:show, :create, :update]

  def show
    @invite = Invite.find_by_code(params[:id])
    if @invite
      if !@invite.status_pending?
        render json: { status: "responded" }
        return
      end
      render :show
    else
      render json: { status: "revoked" }, status: 422
    end
  end

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
        UserMailer.invite_email(invite).deliver_now
      else
        @errors << {
          email: invite.recipient_email,
          error: invite.errors[:invite][0]
        }
      end
    end
  end

  def destroy
    invite = Invite.find(params[:id])
    invite.destroy
    render json: { id: invite.id, board_id: invite.board_id }
  end

  def update
    invite = Invite.find_by(id: params[:id])

    if invite.nil?
      render json: { revoked: "Invite has been revoked"}
      return
    elsif invite.status_accepted?
      # render json: { accepted: 1 }
      # return
    end

    membership = BoardMembership.new(
      board_id: invite.board_id,
      invite_id: invite.id,
      username: params[:invite][:username])

    if !membership.valid? && membership.errors[:username].any?
      render json: { username: membership.errors[:username][0] }, status: 422
      return
    end

    user = invite.find_or_create_user_account(params[:invite][:password])
    if user.errors.any?
      render json: user.errors.messages, status: 422
      return
    end

    membership.user_id = user.id
    membership.save
    invite.update(status: :accepted)
    render json: { board_id: invite.board_id }
  end

  private

  def invite_create_params
    params.require(:invite).permit(:board_id)
  end

  def invite_update_params
    params.require(:invite).permit(:username, :status)
  end
end
