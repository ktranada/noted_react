class Api::UsersController < ApplicationController
  skip_before_action :require_login!, only: [:create]

  def index
      @memberships = BoardMembership.includes(:user).where(board_id: params[:board_id])
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end

  end


  # def update
  # end
  #
  # def destroy
  # end

end
