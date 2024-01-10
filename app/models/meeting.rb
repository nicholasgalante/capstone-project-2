class Meeting < ApplicationRecord
   belongs_to :student
   belongs_to :mentor
   has_many :meeting_resources, dependent: :destroy
   has_many :resources, through: :meeting_resources

   validates :student_id, :mentor_id, :organizer_id, :meeting_datetime, :location, presence: true
end
