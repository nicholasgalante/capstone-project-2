class SessionsController < ApplicationController
   skip_before_action :authorize, only: [:create]
   
   def create
      email_address = params[:email_address].downcase
      user = Mentor.find_by(email_address: email_address) || Student.find_by(email_address: email_address)
      if user&.authenticate(params[:password])
         session[:user_id] = user.id
         session[:user_type] = user.class.name.downcase # "mentor" or "student"
         render json: user, status: :created
      else
         render json: { errors: ["Invalid email or password"] }, status: :unauthorized
      end
      #succesfully saves user id and type to session
      Rails.logger.debug("Session data: #{session.inspect}")
   end
   
   def show
      if @current_user
        render json: @current_user, status: :ok
      else
        render json: { errors: ["Not authorized"] }, status: :unauthorized
      end
    end

   def destroy
      session.delete :user_id
      session.delete :user_type
      head :no_content
   end
end
