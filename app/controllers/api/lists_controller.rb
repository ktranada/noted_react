class Api::ListsController < ApplicationController

  def create
    @list = List.new(list_params)

    if @list.save
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end


  private

  def list_params
    params.require(:list).permit(:title, :ord, :board_id)
  end
end
