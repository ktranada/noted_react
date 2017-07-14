class Api::TimezonesController < ApplicationController
  def index
    result = ActiveSupport::TimeZone.all.map do |tz|
      utc_offset = tz.utc_offset / 3600
      tzinfo = tz.tzinfo
      {
        display: "(UTC#{utc_offset > 0 ? '+' :  utc_offset == 0 ? ' ' : ''}#{utc_offset}) #{tz.name}",
        value: tz.tzinfo.name
      }
    end

    render json: result, status: 200
  end
end
