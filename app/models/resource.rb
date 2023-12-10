class Resource < ApplicationRecord
   has_many :meetings :through => :resource_meetings
end
