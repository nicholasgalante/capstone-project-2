class SessionsController < ApplicationController
   skip_before_action :authorize, only: [:create]
   
   def create
      email_address = params[:email_address].downcase
      user = Mentor.find_by(email_address: email_address) || Student.find_by(email_address: params[:email_address].downcase)
      if user&.authenticate(params[:password])
         session[:user_id] = user.id
         render json: user
      else
         render json: { errors: ["Invalid email or password"] }, status: :unauthorized
      end
   end

   def destroy
      session.delete :user_id
      head :no_content
   end
end
