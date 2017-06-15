class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.where({ board_id: params[:board_id], permission: :public }).order(:title)
    render :index
  end
end
