class Resource < ApplicationRecord
   has_many :resource_meetings
   has_many :meetings, through: :resource_meetings
end
