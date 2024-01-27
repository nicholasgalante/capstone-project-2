class Resource < ApplicationRecord
   has_many :meeting_resources
   has_many :meetings, through: :meeting_resources
   belongs_to :owner, polymorphic: true

   validates :title, :owner_type, :owner_id, :url, presence: true    
end
