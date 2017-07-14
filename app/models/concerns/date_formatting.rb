module DateFormatting
  extend ActiveSupport::Concern

  def formatted_creation_date(user)
    created_at.in_time_zone(user.timezone).strftime("%b %d %Y, %l:%M %p")
  end

  def create_time(user)
    created_at.in_time_zone(user.timezone).strftime("%l:%M %p")
  end

  def create_date(user)
    local_date = created_at.in_time_zone(user.timezone)
    local_date.strftime("%B #{local_date.day.ordinalize}#{local_date.year != Time.new.year ? ", %Y" : ""}")
  end

  def time_offset(user)
    created_at.hour * 60 + created_at.min
  end
end
