class ResourceSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :owner_type, :owner_id
end
