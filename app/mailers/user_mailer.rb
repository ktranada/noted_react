class UserMailer < ActionMailer::Base
  default from: "welcome@noted.pw"

  def invite_email(invite)
    @board = invite.board
    @invite = invite
    domain = ENV['RAILS_ENV'] === 'development' ? '127.0.0.1:3000' : 'noted.pw'
    @url = "http://#{domain}/#/invite/#{invite.code}"
    @unsubscribe_url = "#{@url}?unsubscribe=true"

    mail(to: @invite.recipient_email,
         subject: "#{invite.board_member.email} has invited you to join a board on Noted.")

  end
end
