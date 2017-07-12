json.extract! message, :id, :author_id, :channel_id, :content
json.date message.create_date
json.time message.create_time
json.time_offset message.time_offset
