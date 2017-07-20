class Api::ListsController < ApplicationController
  def index
    @board_id = params[:board_id]
    @lists = List.includes(cards: [:comments]).where(board_id: params[:board_id]).order('position')
    @cards = @lists.map(&:cards).flatten
  end
end
