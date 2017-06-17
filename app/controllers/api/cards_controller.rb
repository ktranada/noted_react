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
    if @card.update(card_params)
      render :create
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  private

  def card_params
    params.require(:card).permit(:list_id, :title, :ord, :description)
  end
end
