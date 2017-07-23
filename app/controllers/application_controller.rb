class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordNotFound do
    render json: ["Record not found"], status: :not_found
  end

  before_action :require_login!
  before_action :confirm_board_membership
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
    @board_memberships = user.board_membership_ids
    user.update_appearance(:online)
  end

  def logout
    @current_user.try(:reset_session_token!)
    @current_user.update_appearance(:offline)

    SessionEndBroadcastJob.perform_now(@current_user)

    ActionCable.server.disconnect(current_user: @current_user)

    session[:session_token] = nil
    cookies.signed[:session_token] = nil

    @current_user = nil
  end

  def can_access_board?
    board_id = params[:controller] == "api/boards" ? params[:id] : params[:board_id]
    current_user.board_memberships.map(&:board_id).include?(board_id.to_i)
  end

  def confirm_board_membership
    unless can_access_board?
      render json: "You are not a member of this board.", status: 401
    end
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
