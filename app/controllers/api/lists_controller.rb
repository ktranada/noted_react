class Api::ListsController < ApplicationController

  def create
    @list = List.new(list_params)

    if @list.save
      render :create
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def update

    @list = List.find(params[:id])
    if list_params[:position] != @list.position
      @list.insert_at(list_params[:position].to_i)
    elsif @list.update(title: list_params[:title])
    end

    if !@list.errors.any?
      ActionCable.server.broadcast("board:#{@list.board_id}",
        type: 'list',
        action: 'move',
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
