class AddMatchedToMentors < ActiveRecord::Migration[7.1]
  def change
    add_column :mentors, :matched, :boolean, default: false
  end
end
