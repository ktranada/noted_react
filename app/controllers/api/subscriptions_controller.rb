class Api::SubscriptionsController < ApplicationController
  def index
    @subscriptions = current_user.subscriptions_by_board
    render :index
  end
end
