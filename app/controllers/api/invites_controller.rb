class Api::InvitesController < ApplicationController
  skip_before_action :require_login!, only: [:show,  :update]
  skip_before_action :confirm_board_membership, only: [:show, :update]

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
        email: info["email"])

      if invite.save
        @invites << invite
        UserMailer.invite_email(invite).deliver_now
      else
        @errors << {
          email: invite.email,
          errors: {
            invites: invite.errors[:invites][0],
            invite: invite.errors[:invite][0],
            email: invite.errors[:email][0]
          }
        }
      end
    end
  end
  
  def show
    @invite = Invite.find_by_code(params[:id])
    if @invite
      if !@invite.status_pending?
        render json: { status: "responded" }, status: 422
      else
        render :show
      end
    else
      render json: { status: "revoked" }, status: 422
    end
  end

  def update
    invite = Invite.find_by(id: params[:id])

    if invite.nil?
      render json: { status: "revoked"}, status: 422
      return
    elsif invite.status_accepted?
      render json: { status: "responded" }, status: 422
      return
    end

    membership = BoardMembership.new(
      board_id: invite.board_id,
      invite_id: invite.id,
      username: params[:invite][:username],
      status: current_user ? :online : :offline)

    errors = {}
    if !membership.valid? && membership.errors[:username].any?
      errors[:username] = membership.errors[:username][0]
    end

    @user = invite.find_or_create_user_account(params[:invite][:password], params[:invite][:timezone])
    if !@user.valid? && @user.errors[:password].any?
      errors[:password] = @user.errors[:password][0]
    end

    if !errors.empty?
      render json: errors, status: 422
      return
    end


    if @user.save
      membership.user_id = @user.id
      if membership.save
        ActionCable.server.broadcast("notification:#{membership.board_id}", {
          type: 'membership',
          action: 'add',
          membership: {
            board_id: membership.board_id,
            user_id: @user.id,
            membership_id: membership.id,
            invite_id: invite.id,
            username: membership.username
          }
        })

        if membership.status_online?
          ActionCable.server.broadcast("appearance:#{membership.board_id}",
            board_id: membership.board_id,
            user_id: @user.id,
            status: :online
          )
        end

        invite.update(status: :accepted)
        render json: { board_id: invite.board_id }
      end
      return
    end
    render json: "Invite could not be updated", status: 422
  end

  def destroy
    invite = Invite.find(params[:id])
    invite.destroy
    render json: { id: invite.id, board_id: invite.board_id }
  end

  private

  def invite_create_params
    params.require(:invite).permit(:board_id)
  end

  def invite_update_params
    params.require(:invite).permit(:username, :status)
  end
end
