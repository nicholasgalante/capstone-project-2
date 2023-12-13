class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  before_action :authorize

  def authorize
    #bug: session info does not persist after login sessions:create
    Rails.logger.debug("Session data - ApplicationAuthorize: #{session.inspect}")
    if session[:user_type] == "mentor"
      @current_user = Mentor.find_by(id: session[:user_id])
      render json: { user: @current_user }
    elsif session[:user_type] == "student"
      @current_user = Student.find_by(id: session[:user_id])
    else
      render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end
  end


  #tested to see if sessions and cookies are working properly in browser => successful 
  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { count: session[:user_type] }
  end

  private

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { errors: exception.message }, status: :not_found
  end
end
