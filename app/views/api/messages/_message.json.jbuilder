json.extract! message, :id, :author_id, :channel_id, :content
json.date message.create_date(current_user)
json.time message.create_time(current_user)
json.time_offset message.time_offset(current_user)
json.timestamp message.created_at.to_i
