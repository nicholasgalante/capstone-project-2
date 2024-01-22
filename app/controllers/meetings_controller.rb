class MeetingsController < ApplicationController
  def index
    meetings = @current_user.meetings.all
    render json: meetings, status: :ok
  end

  def show
    meeting = Meeting.find(params[:id])
    render json: meeting, status: :ok
  end

  def update
    meeting = Meeting.find(params[:id])
    meeting.update!(meeting_params)
    render json: meeting, status: :ok
  end

  def create
    meeting = Meeting.create!(meeting_params)
    render json: meeting, status: :created
  end

  def destroy
    meeting = Meeting.find(params[:id])
    meeting.destroy
    head :no_content
  end

  private

  def meeting_params
    params.require(:meeting).permit(:id, :mentor_id, :student_id, :organizer_id, :location, :meeting_datetime, :topics_discussed, :next_steps, :resources)
  end
end
