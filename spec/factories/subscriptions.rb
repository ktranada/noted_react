# == Schema Information
#
# Table name: subscriptions
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  channel_id :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

FactoryGirl.define do
  factory :subscription do
    
  end
end
