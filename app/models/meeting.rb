class Meeting < ApplicationRecord
   belongs_to :student
   belongs_to :mentor
   has_many :resources :through => :resource_meetings, dependent: :destroy

   validates :student_id, :mentor_id, :date, :time, presence: true

end
