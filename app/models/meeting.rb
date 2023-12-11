class Meeting < ApplicationRecord
   belongs_to :student
   belongs_to :mentor
   has_many :resource_meetings, dependent: :destroy
   has_many :resources, through: :resource_meetings

   validates :student_id, :mentor_id, :meeting_datetime, :location, :topics_discussed, :next_steps, presence: true
end
