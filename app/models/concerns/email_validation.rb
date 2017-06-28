module EmailValidation
  extend ActiveSupport::Concern

  included do
    validate :is_email_valid?, on: :create
  end

  def is_email_valid?
    url = "https://api.mailgun.net/v3/address/private/validate"
    begin
      response = RestClient::Request.execute(method: :get, url: url,
        user: 'api',
        password: ENV['mailgun_private_api_key'],
        headers: {
           params: { address: email }
      })

      if response.code == 200
        json = JSON.parse(response.body)
        if json['did_you_mean']
          errors.add(:email, "Did you mean #{json['did_you_mean']}?")
        elsif !json['is_valid']
          errors.add(:email, "This is not a valid email address")
        end
      else
        errors.add(:email, "Email could not be verified")
      end
    rescue
      errors.add(:email, "Email could not be verified")
    end
  end
end
