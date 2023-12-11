class StudentApplicationsController < ApplicationController 
  
   def create
      student_application = StudentApplication.create(student_application_params)
      if student_application.valid?
         render json: student_application, status: :created
      else
         render json: { errors: student_application.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def destroy
      student_application = StudentApplication.find(params[:id])
      student_application.destroy
      head :no_content
   end

   private

   def student_application_params
      params.permit(:first_name, :last_name, :email, :phone_number, :linkedin_url, :github_url, :resume_url, :personal_website_url, :other_url, :reason_for_applying, :how_did_you_hear_about_us, :student_id)
   end
end
