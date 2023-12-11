class MentorApplication < ApplicationRecord
   belongs_to :mentor

   validates :mentor_id, :resume_url, :motivation, :goals_aspirations, :philosophy, presence: true
end
