class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordNotFound do
    render json: ["Record not found"], status: :not_found
  end

  before_action :require_login!
  # before_action :require_board_membership
  helper_method :current_user, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
    cookies.signed[:session_token] = user.session_token
    @current_user = user
    user.update_appearance(:online)
  end

  def logout
    @current_user.try(:reset_session_token!)
    @current_user.update_appearance(:offline)
    session[:session_token] = nil
    cookies.signed[:session_token] = nil
    @current_user = nil
  end



  def require_login!
    unless logged_in?
      render json: ["You must be signed in to perform that action."], status: 401
    end
  end

  protected

  def user_params
    params.require(:user).permit(:email, :password, :timezone)
  end
end
