class MeetingResourcesController < ApplicationController

   def create
      debugger
      meeting_resource = MeetingResource.create!(meeting_resource_params)
      render json: meeting_resource, status: :created
   end
   
   def destroy
      meeting_resource = MeetingResource.find(params[:id])
      meeting_resource.destroy
      head :no_content
   end
   
   private
   
   def meeting_resource_params
      params.require(:meeting_resource).permit(:id, :meeting_id, :resource_id)
   end
end
