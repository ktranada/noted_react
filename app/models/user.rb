# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  timezone        :string           not null
#

class User < ActiveRecord::Base
  attr_reader :password
  include EmailValidation

  default_scope { order(:email)}
  after_initialize :ensure_session_token
  before_create :downcase_email

  validates :timezone, presence: true
  validates :session_token, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: { case_sensitive: false, message: "Email has been taken"}
  validates :password_digest, presence: {  message: "Password cannot be blank" }
  validates :password, length: { minimum: 6, message: "Password must contain 6 characters" }, allow_nil: true

  has_many :boards, dependent: :destroy
  has_many :board_memberships, dependent: :destroy, inverse_of: :user

  has_many :invites, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :subscribed_channels, through: :subscriptions, source: :channel
  has_many :messages, dependent: :destroy, foreign_key: 'author_id'

  def current_board
    self.boards[0]
  end

  def self.find_by_credentials(email, password)
    @user = User.find_by_email(email.downcase)
    @user.try(:password_is?, password) ? @user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64()
  end


  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def password_is?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
    self.session_token
  end

  def update_appearance(status)
    board_memberships.update_all(status: status)

    board_memberships.each do |membership|
      ActionCable.server.broadcast("appearance:#{membership.board_id}",
        board_id: membership.board_id,
        user_id: self.id,
        status: status
      )
    end
  end

  def subscriptions_by_board
    result = {}

    subscriptions.each do |sub|
      result[sub.board_id] = result[sub.board_id].nil? ?
        [sub.channel_id] :
        result[sub.board_id] << sub.channel_id
    end

    result
  end

  private

  def downcase_email
    self.email = self.email.downcase
  end

  def ensure_session_token
    self.session_token ||=  User.generate_session_token
  end
end
