class AddForeignKeysToMeeting < ActiveRecord::Migration[7.1]
  def change
    add_column :meetings, :mentor_id, :string
    add_column :meetings, :student_id, :string
  end
end
