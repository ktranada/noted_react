class BoardContentChannel < ApplicationCable::Channel
  def subscribed
    @board_id = params[:room]
    stream_from "board_content:#{@board_id}"
  end

  def create_list(data)
    List.create(title: data['title'], board_id: @board_id)
  end

  def create_card(data)
    card = Card.new(list_id: data['list_id'], title: data['title'], description: data['description'])
    if card.save
      CardBroadcastJob.perform_now('create', @board_id, card.list_id, card)
    end
  end

  def create_comment(data)
    comment = Comment.new(
      user_id: current_user.id,
      card_id: data['card_id'],
      description: data['description']
    )

    if comment.save
      CommentBroadcastJob.perform_now('create', @board_id, current_user, comment)
    end
  end

  def edit_list(data)
    list = List.where(id: data['id']).first
    if !list.nil? && list.update(title: data['title'])
      ListBroadcastJob.perform_now('update', list, current_user.id)
    end
  end

  def edit_card(data)
    card = Card.where(id: data['id']).first
    if !card.nil? && card.update(title: data['title'], description: data['description'])
      CardBroadcastJob.perform_now('update', @board_id, card.list_id, card, current_user.id)
    end
  end

  def update_list_position(data)
    list = List.where(id: data['id']).first
    if !list.nil?
      list.insert_at(data['position'].to_i)
      ListBroadcastJob.perform_now('move', list, current_user.id)
    end
  end

  def update_card_position(data)
    card = Card.where(id: data['id']).first
    if !card.nil?
      previous_list_id = card.list_id
      card.move(data)
      if !card.errors.any?
        CardBroadcastJob.perform_now('move', @board_id, previous_list_id, card, current_user.id)
      end
    end
  end

  def destroy_card(data)
    card = Card.where(id: data['id']).first
    if !card.nil?
      comment_ids = card.comment_ids
      card.destroy
      CardBroadcastJob.perform_now('destroy', @board_id, card.list_id, card, current_user.id, comment_ids)
    end
  end

  def destroy_list(data)
    list = List.includes(cards: [:comments]).where(id: data['id']).first
    if !list.nil?
      card_ids = list.card_ids
      comment_ids = list.cards.map(&:comments).flatten.pluck(:id)
      list.destroy
      ListBroadcastJob.perform_now('destroy', list, current_user.id, card_ids, comment_ids)
    end
  end
end
