class UserMailerPreview < ActionMailer::Preview
  def invite_email
    UserMailer.invite_email(Invite.first)
  end
end
