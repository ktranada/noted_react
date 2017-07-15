class Api::CardsController < ApplicationController
  def create
    @card = Card.new(card_params)
    if @card.save
      ActionCable.server.broadcast("board:#{params[:card][:board_id]}",
        type: 'card',
        action: 'add',
        card: {
          id: @card.id,
          list_id: @card.list_id,
          title: @card.title,
          description: @card.description,
          comments: []
        },
        updated_by: params[:card][:updated_by]
      )
      render :create
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def update
    @card = Card.find(params[:id])
    previous_list_id = @card.list_id

    action = ''
    if params[:card][:type] == 'position'
      action = 'move'
      @card.move(card_params)
    elsif @card.update(card_params)
      action = 'update'
    end

    if !@card.errors.any?
      ActionCable.server.broadcast("board:#{params[:card][:board_id]}",
        type: 'card',
        action: action,
        card: {
          id: @card.id,
          list_id: @card.list_id,
          title: @card.title,
          description: @card.description,
          position: @card.position
        },
        previous_list_id: previous_list_id,
        updated_by: params[:card][:updated_by]
      )
      render :create
    else
      render json: @card.errors.full_messages, status: 422
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
