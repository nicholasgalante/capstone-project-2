class MeetingsController < ApplicationController
   skip_before_action :authorize

   def index
      meetings = Meeting.all
      render json: meetings, status: :ok
   end

   def show
      meeting = Meeting.find(params[:id])
      render json: meeting, status: :ok
   end

   def create
      meeting = Meeting.create(meeting_params)
      render json: meeting, status: :created
   end

   def destroy
      meeting = Meeting.find(params[:id])
      meeting.destroy
      head :no_content
   end

   private

   def meeting_params
      params.require(:meeting). permit(:mentor_id, :student_id, :meeting_date, :meeting_time, :meeting_location, :meeting_notes)
   end

end

