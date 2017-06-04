class Api::ConversationsController < ApplicationController
  def index
    @conversations = Conversation.where(board_id: params[:board_id]).order(:title)
    render :index
  end
end
