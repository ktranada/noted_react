class MembershipChannel < ApplicationCable::Channel
  def subscribed
    stream_from "membership:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
