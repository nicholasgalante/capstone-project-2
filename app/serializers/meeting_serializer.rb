class MeetingSerializer < ActiveModel::Serializer
  attributes :id, :organizer_id, :meeting_datetime, :location, :topics_discussed, :next_steps
end
