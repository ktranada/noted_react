# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

Rails.application.config.action_cable.allowed_request_origins = [/http:\/\/*/, /https:\/\/*/]
