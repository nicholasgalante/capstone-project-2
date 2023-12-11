class StudentApplication < ApplicationRecord
   belongs_to :student

   validates :student_id, :current_gpa, :major, :motivation, :portfolio_url, :goals_aspirations, presence: true
   validates :current_gpa, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 4 } 
end
