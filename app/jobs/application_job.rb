class ApplicationJob < ActiveJob::Base
  protected
    def render_jbuilder(partial, locals)
      JSON.parse(ApplicationController.renderer.render(partial: partial, locals: locals))
    end
end
