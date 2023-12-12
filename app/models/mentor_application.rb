class MentorApplication < ApplicationRecord
   belongs_to :mentor

   validates :mentor_id, :resume_url, :motivation, :philosophy, presence: true
end
