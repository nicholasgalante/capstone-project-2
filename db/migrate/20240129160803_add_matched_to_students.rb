class AddMatchedToStudents < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :matched, :boolean, default: false
  end
end
