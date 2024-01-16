class Resource < ApplicationRecord
   has_many :meeting_resources
   has_many :meetings, through: :meeting_resources
   belongs_to :owner, polymorphic: true

   validates :title, :url, presence: true    
end
