# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require "bcrypt"

puts "Clearing the database..."
[Mentor, Student, Meeting, MentorApplication, StudentApplication, Resource, MeetingResource].each do |model|
  model.delete_all
end

puts "🌱 Seeding..."


Mentor.create!(
  first_name: "Carla",
  last_name: "Doe",
  email_address: "carla@example.com",
  password_digest: BCrypt::Password.create("password"),
  company_name: "TechCo",
  job_title: "Data Scientist",
)


MentorApplication.create!(
  application_status: "Approved",
  resume_url: "https://example.com/Carla_doe_resume.pdf",
  motivation: "I enjoy sharing my knowledge and experience with others. I'm excited to help students achieve their academic and career goals.",
  skills_expertise: "Data science, machine learning, statistics",
  philosophy: "I believe in providing personalized guidance and support to each student.",
  mentor_id: Mentor.find_by(first_name: "Carla").id,
)


Student.create!(
  first_name: "Ali",
  last_name: "Johnson",
  email_address: "ali@example.com",
  password_digest: BCrypt::Password.create("password"),
  university_name: "Massachusetts Institute of Technology",
  degree_type: "Master of Science",
  area_of_study: "Data Science",
  expected_graduation_date: Date.new(2024, 8, 15),
  mentor_id: Mentor.find_by(first_name: "Carla").id,
)


StudentApplication.create!(
  application_status: "Accepted",
  current_gpa: 3.8,
  major: "Computer Science",
  motivation: "I'm eager to learn from an experienced professional and gain valuable insights into the software development industry.",
  portfolio_url: "https://example.com/alice_smith_portfolio",
  goals_aspirations: "Develop mobile applications and work at a leading tech company",
  student_id: Student.find_by(first_name: "Ali").id,
)

Resource.create!(
  title: "Introduction to Web Development",
  url: "https://example.com/web_development_intro",
  owner_type: "Mentor",
  owner_id: Mentor.find_by(first_name: "Carla").id,
)

Resource.create!(
  title: "Data Science Best Practices",
  url: "https://example.com/data_science_best_practices",
  owner_type: "Mentor",
  owner_id: Mentor.find_by(first_name: "Carla").id,
)

Resource.create!(
  title: "Effective Team Collaboration",
  url: "https://example.com/team_collaboration_guide",
  owner_type: "Mentor",
  owner_id: Mentor.find_by(first_name: "Carla").id,
)

Resource.create!(
  title: "Mobile App Development Fundamentals",
  url: "https://example.com/mobile_app_dev_fundamentals",
  owner_type: "Mentor",
  owner_id: Mentor.find_by(first_name: "Carla").id,
)

Resource.create!(
  title: "Leadership in Software Engineering",
  url: "https://example.com/software_engineering_leadership",
  owner_type: "Student",
  owner_id: Student.find_by(first_name: "Ali").id,
)

meeting1 = Meeting.create!(
  organizer_id: Student.find_by(first_name: "Ali").id,
  student_id: Student.find_by(first_name: "Ali").id,
  mentor_id: Mentor.find_by(first_name: "Carla").id,
  meeting_datetime: DateTime.new(2024, 01, 15, 14, 00),
  location: "Acme Corp Conference Room",
  topics_discussed: "Career goals, software development projects",
  next_steps: "Work on portfolio website, attend coding bootcamp",
)

meeting2 = Meeting.create!(
  organizer_id: Mentor.find_by(first_name: "Carla").id,
  student_id: Student.find_by(first_name: "Ali").id,
  mentor_id: Mentor.find_by(first_name: "Carla").id,
  meeting_datetime: DateTime.new(2024, 02, 01, 10, 00),
  location: "TechCo Coffee Shop",
  topics_discussed: "Machine learning algorithms, data analysis techniques",
  next_steps: "Complete online data science courses, participate in hackathons",
)

meeting3 = Meeting.create!(
  organizer_id: Student.find_by(first_name: "Ali").id,
  student_id: Student.find_by(first_name: "Ali").id,
  mentor_id: Mentor.find_by(first_name: "Carla").id,
  meeting_datetime: DateTime.new(2024, 02, 15, 16, 30),
  location: "TechCo Office",
  topics_discussed: "Advanced machine learning concepts, project planning",
  next_steps: "Implement machine learning models, set project milestones",
)

meeting4 = Meeting.create!(
  organizer_id: Mentor.find_by(first_name: "Carla").id,
  student_id: Student.find_by(first_name: "Ali").id,
  mentor_id: Mentor.find_by(first_name: "Carla").id,
  meeting_datetime: DateTime.new(2024, 03, 05, 11, 00),
  location: "TechCo Conference Room",
  topics_discussed: "Data analysis case studies, career development strategies",
  next_steps: "Explore real-world data sets, update resume and LinkedIn profile",
)

meeting5 = Meeting.create!(
  organizer_id: Mentor.find_by(first_name: "Carla").id,
  student_id: Student.find_by(first_name: "Ali").id,
  mentor_id: Mentor.find_by(first_name: "Carla").id,
  meeting_datetime: DateTime.new(2024, 03, 20, 14, 30),
  location: "TechCo Coffee Shop",
  topics_discussed: "Networking opportunities, industry trends",
  next_steps: "Attend networking events, stay updated on latest industry news",
)

MeetingResource.create!(
  meeting_id: meeting1.id,
  resource_id: Resource.find_by(title: "Introduction to Web Development").id,
)

MeetingResource.create!(
  meeting_id: meeting1.id,
  resource_id: Resource.find_by(title: "Effective Team Collaboration").id,
)

MeetingResource.create!(
  meeting_id: meeting2.id,
  resource_id: Resource.find_by(title: "Data Science Best Practices").id,
)

MeetingResource.create!(
  meeting_id: meeting2.id,
  resource_id: Resource.find_by(title: "Mobile App Development Fundamentals").id,
)

puts "🌱 Successfuly Seeded!"
