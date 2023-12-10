# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_12_10_192639) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "meeting_resources", force: :cascade do |t|
    t.integer "meeting_id"
    t.integer "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meetings", force: :cascade do |t|
    t.integer "organizer_id"
    t.datetime "meeting_datetime"
    t.string "location"
    t.text "topics_discussed"
    t.text "next_steps"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mentor_applications", force: :cascade do |t|
    t.string "application_status"
    t.string "resume_url"
    t.text "motivation"
    t.text "skills_expertise"
    t.text "philosophy"
    t.integer "mentor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mentors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email_address"
    t.string "pasword_digest"
    t.string "company_name"
    t.string "job_title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "resources", force: :cascade do |t|
    t.string "title"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "student_applications", force: :cascade do |t|
    t.string "application_status"
    t.integer "current_gpa"
    t.string "major"
    t.text "motivation"
    t.string "portfolio_url"
    t.text "goals_aspirations"
    t.integer "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email_address"
    t.string "password_digest"
    t.string "university_name"
    t.string "degree_type"
    t.string "area_of_study"
    t.date "expected_graduation_date"
    t.integer "mentor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
