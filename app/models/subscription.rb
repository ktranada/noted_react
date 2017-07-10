# == Schema Information
#
# Table name: subscriptions
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subscription < ApplicationRecord
  belongs_to :user, inverse_of: :subscriptions
  belongs_to :channel, inverse_of: :subscriptions
  belongs_to :board, inverse_of: :subscriptions
end
