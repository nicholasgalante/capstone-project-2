class MeetingResourcesController < ApplicationController

   def create
      meeting_resource = MeetingResource.create!(meeting_resource_params)
      render json: meeting_resource, status: :created
   end
   
   
   def destroy

      meeting_id = params[:meeting_id]
      resource_id = params[:resource_id]
  
      # Find the MeetingResource record using meeting_id and resource_id
      @meeting_resource = MeetingResource.find_by(meeting_id: meeting_id, resource_id: resource_id)
  
      if @meeting_resource
        if @meeting_resource.destroy
          render json: { message: 'MeetingResource deleted successfully' }, status: :ok
        else
          render json: { errors: @meeting_resource.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { errors: ['MeetingResource not found'] }, status: :not_found
      end
    end

   private
   
   def meeting_resource_params
      params.require(:meeting_resource).permit(:id, :meeting_id, :resource_id)
   end
end
