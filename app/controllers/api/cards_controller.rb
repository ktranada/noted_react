class Api::CardsController < ApplicationController
  def create
    @card = Card.new(card_params)
    if @card.save
      render :create
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def update
    @card = Card.find(params[:id])
    previous_list_id = @card.list_id
    if params[:card][:type] == 'position'
      @card.move(card_params)
      ActionCable.server.broadcast("board:#{params[:card][:board_id]}",
        type: 'card',
        action: 'move',
        card: {
          id: @card.id,
          previous_list_id: previous_list_id,
          list_id: @card.list_id,
          title: @card.title,
          description: @card.description,
          position: @card.position
        },
        updated_by: params[:card][:updated_by]
      )
      render json: {}
    else
      if @card.update(card_params)
        render :create
      else
        render json: @card.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    card = Card.find(params[:id])
    card.destroy
    render json: { id: card.id, list_id: card.list_id }
  end

  private

  def card_params
    params.require(:card).permit(:list_id, :title, :position, :description)
  end
end
