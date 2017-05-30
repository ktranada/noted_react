class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login!

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
    @current_user = user
  end

  def logout
    @current_user.try(:reset_session_token!)
    session[:session_token] = nil
    @current_user = nil
  end



  def require_login!
    unless logged_in?
      render json: ["You must be signed in to perform that action."], status: 401
    end
  end

  protected

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
