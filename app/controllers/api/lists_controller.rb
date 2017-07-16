class Api::ListsController < ApplicationController
  def create
    @list = List.new(list_params)

    if @list.save
      ActionCable.server.broadcast("board:#{@list.board_id}",
        type: 'list',
        action: 'add',
        list: {
          id: @list.id,
          title: @list.title,
          position: @list.position,
          board_id: @list.board_id,
          cards: []
        },
        updated_by: params[:list][:updated_by]
      )
      render :create
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def index
    @board_id = params[:board_id]
    @lists = List.includes(cards: [:comments]).where(board_id: params[:board_id]).order('position')
    @cards = @lists.map(&:cards).flatten
  end

  def update
    @list = List.find(params[:id])

    action = ''
    if list_params[:position] != @list.position
      @list.insert_at(list_params[:position].to_i)
      action = 'move'
    elsif @list.update(title: list_params[:title])
      action = 'update'
    end

    if !@list.errors.any?
      ActionCable.server.broadcast("board:#{@list.board_id}",
        type: 'list',
        action: action,
        list: {
          id: @list.id,
          title: @list.title,
          position: @list.position
        },
        updated_by: params[:list][:updated_by]
      )
      render json: {}
    else
      render json: ["Could not update list"], status: 422
    end
  end


  private

  def list_params
    params.require(:list).permit(:title, :position, :board_id)
  end
end
