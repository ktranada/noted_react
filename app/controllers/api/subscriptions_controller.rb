class Api::SubscriptionsController < ApplicationController
  skip_before_action :confirm_board_membership
  def index
    @subscriptions = current_user.subscriptions_by_board
    render :index
  end
end
