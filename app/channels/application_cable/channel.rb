module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def can_access_board?
      board_id = params[:board_id]
      current_user.board_memberships.map(&:board_id).include?(board_id.to_i)
    end
  end
end
