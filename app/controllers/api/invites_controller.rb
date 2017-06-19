class Api::InvitesController < ApplicationController
  skip_before_action :require_login!, only: [:create, :update]

  def create
    @invite = Invite.new(invite_create_params)
    @invite.user_id = current_user.id

    if @invite.save
      render :create
    else
      render json: @invite.errors.full_messages, status: 422
    end
  end

  def destroy
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
    params.require(:invite).permit(:status)
  end
end
