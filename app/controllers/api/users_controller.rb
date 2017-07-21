class Api::UsersController < ApplicationController
  skip_before_action :require_login!, only: [:create]
  skip_before_action :confirm_board_membership, only: [:create, :destroy, :update]

  def index
    @memberships = BoardMembership.includes(:user).where(board_id: params[:board_id]).order(:username)
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.messages, status: 422
    end

  end


  def update
    @user = User.find(params[:id])
    previous_time_zone = @user.timezone
    if @user.update(user_params)
      render json: { id: @user.id, email: @user.email, timezone: @user.timezone }
    else
      render json: @user.errors.messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    render json: { id: @user.id }
  end
end
