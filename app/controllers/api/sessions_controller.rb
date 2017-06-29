class Api::SessionsController < ApplicationController
  skip_before_action :require_login!, only: [:create]
  def create
    @user = User.includes(board_memberships: [:board]).find_by_credentials(
      user_params[:email],
      user_params[:password]
    )
    if @user
      login(@user)
      render "api/users/show"
    else
      render json: {credentials: "Invalid credentials"}, status: 422
    end
  end

  def destroy
    @user = current_user

    if @user
      logout
      render json: {}
    else
      render json: ["Nobody is signed in"], status: 404
    end
  end
end
