class CreateMeetingResources < ActiveRecord::Migration[7.1]
  def change
    create_table :meeting_resources do |t|
      t.integer :meeting_id
      t.integer :resource_id

      t.timestamps
    end
  end
end
