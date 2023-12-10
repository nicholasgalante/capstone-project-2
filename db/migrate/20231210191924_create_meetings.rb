class CreateMeetings < ActiveRecord::Migration[7.1]
  def change
    create_table :meetings do |t|
      t.integer :organizer_id
      t.datetime :meeting_datetime
      t.string :location
      t.text :topics_discussed
      t.text :next_steps

      t.timestamps
    end
  end
end
