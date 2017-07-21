class MembershipChannel < ApplicationCable::Channel
  def subscribed
    stream_from "membership:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def destroy_membership(data)
    membership = BoardMembership.to_destroy(data['id'])
    if !membership.nil? && membership.board_is_owned_by?(current_user)
      membership.destroy
      MembershipRemovalJob.perform_now(current_user, membership)
    end
  end
end
