class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  before_action :authorize

  def authorize
    user_type = session[:user_type]
    user_id = session[:user_id]
  
    unless user_type && user_id
      render json: { errors: ["Not authorized"] }, status: :unauthorized
      return
    end
  
    model_class = user_type.capitalize.constantize
    @current_user = model_class.find_by(id: user_id)
  
    if @current_user
      render json: { user: @current_user }
    else
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end
  end

  private

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { errors: exception.message }, status: :not_found
  end
end
