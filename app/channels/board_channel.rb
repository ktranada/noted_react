class BoardChannel < ApplicationCable::Channel
  def subscribed
    @board_id = params[:room]
    stream_from "board:#{@board_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create_list(data)
    List.create(title: data['title'], board_id: @board_id)
  end

  def create_card(data)
    card = Card.new(list_id: data['list_id'], title: data['title'], description: data['description'])
    if card.save
      CardBroadcastJob.perform_now('create', @board_id, card.list_id, card, -1)
    end
  end

  def update_list_position(data)
    list = List.where(id: data['id']).first
    if !list.nil?
      list.insert_at(data['position'].to_i)
      ListBroadcastJob.perform_now('move', list, data['updated_by'])
    end
  end

  def update_card_position(data)
    card = Card.where(id: data['id']).first
    if !card.nil?
      previous_list_id = card.list_id
      card.move(data)
      if !card.errors.any?
        CardBroadcastJob.perform_now('move', @board_id, previous_list_id, card, data['updated_by'])
      end
    end
  end
end
