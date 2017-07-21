class ApplicationJob < ActiveJob::Base
  protected
    def render_jbuilder(partial, locals)
      JSON.parse(ApplicationController.renderer.render(partial: partial, locals: locals))
    end

    def broadcast_body(type, action, updated_by, item)
      body = {
        type: type,
        action: action,
        updated_by: updated_by
      }
      body[type] = item
      body
    end
end
