class Resource < ApplicationRecord
   has_many :meeting_resources
   has_many :meetings, through: :meeting_resources
   belongs_to :mentor

   validates :title, :url, presence: true    
end
