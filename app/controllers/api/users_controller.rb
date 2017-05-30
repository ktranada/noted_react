class Api::UsersController < ApplicationController
  skip_before_action :require_logged_in, only: [:create]
  def create
    @user = User.new(user_params)

    if @user.save
      render "api/users/show"
    else
      render json: @user.error.full_messages, status: 422
    end

  end

  # def update
  # end
  #
  # def destroy
  # end

end
