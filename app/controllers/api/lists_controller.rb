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
    if params[:type] === 'order'
      data = JSON.parse(params[:lists])
      lists = List.where(board_id: params[:board_id], id: data['ids'])

      @success = []
      @errors = []

      lists.each do |list|
        position = data[list.id.to_s]
        if list.position != position
          if !list.set_list_position(position)
            @errors << list.errors
          end
        end
      end

      render json: { order: data['ids'], errors: @errors, board_id: params[:board_id] }
    else
      @list = List.find(params[:id])
      if list_params[:position] != @list.position
        @list.insert_at(list_params[:position].to_i)
        render json: { id: @list.id, position: @list.position }
      elsif @list.update(title: list_params[:title])
        render json: { id: @list.id, title: @list.title }
      else
        render json: ["Could not update list"], status: 422
      end


    end
  end


  private

  def list_params
    params.require(:list).permit(:title, :position, :board_id)
  end
end
