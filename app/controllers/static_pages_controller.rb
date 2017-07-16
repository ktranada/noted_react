class StaticPagesController < ApplicationController
  skip_before_action :require_login!, :confirm_board_membership
  def root; end
end
