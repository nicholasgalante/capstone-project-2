class AddOwnerToResources < ActiveRecord::Migration[7.1]
  def change
    add_reference :resources, :owner, polymorphic: true, index: true
  end
end
