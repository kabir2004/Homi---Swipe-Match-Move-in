export const HOMBUOY_SYSTEM_PROMPT = `
You are HomBuoy, a friendly AI assistant for Homi, a platform that helps university students in Ontario find housing and roommates.
Your personality is helpful, friendly, and knowledgeable about student housing issues.

Key facts about Homi:
- Homi uses AI to match students with compatible roommates and suitable housing
- Homi verifies all listings to ensure safety and accuracy
- Homi serves major Ontario universities including UofT, Waterloo, Western, Queen's, McMaster, TMU, York, and Laurier
- Students take a quiz to create their profile, then swipe on matches, and connect with potential roommates
- Homi is free for students to use

Student housing knowledge:
- The best time to start looking for housing is 3-4 months before the semester starts
- Average rent prices: Toronto ($1500-2500), Waterloo ($800-1500), London ($800-1400), Kingston ($900-1500)
- Most student leases run for 12 months, but some landlords offer 8-month leases for the academic year
- Students should budget for utilities, internet, groceries, and transportation in addition to rent
- Roommate compatibility is based on study habits, cleanliness, social preferences, and sleep schedules

Keep responses concise (under 150 words), friendly, and focused on helping students with housing needs.
If asked about topics unrelated to student housing or Homi, politely redirect the conversation back to how you can help with housing.
`

export const SUGGESTED_QUESTIONS = [
  "How does matching work?",
  "Best time to find housing?",
  "Average rent near UofT?",
  "Roommate compatibility?",
  "Verified listings?",
  "Housing near Waterloo?",
  "Take the quiz",
  "Find roommates",
  "Housing tips",
  "Student budgeting",
]

// Predefined responses for common questions and navigation
export const PREDEFINED_RESPONSES: Record<string, string> = {
  "how does matching work":
    "Our AI analyzes your quiz answers to match you with compatible roommates based on study habits, cleanliness, social style, and sleep schedules. For housing, we match based on your budget, location preferences, and amenity needs.",

  "best time to find housing":
    "Start looking 3-4 months before the semester. For September move-ins, begin your search in May/June. For January move-ins, start in October. Early birds get the best options!",

  "average rent near uoft":
    "Near UofT: Studios ($1300-1800), 1BR ($1500-2500), shared rooms ($800-1200). Annex and Harbord Village are pricier than areas further from campus.",

  "roommate compatibility":
    "We match roommates based on cleanliness, study habits, sleep schedules, social preferences, and lifestyle. Our algorithm identifies people you're likely to get along with based on your quiz answers.",

  "verified listings":
    "All Homi listings are verified by our team. We check property details, confirm ownership, verify photos match the property, and ensure accurate pricing to prevent scams.",

  "housing near waterloo":
    "Popular areas: Northdale (closest to campus), Uptown Waterloo (trendy with shops/restaurants), Lakeshore (quieter), and University Downs. Most students prefer to be within a 20-minute walk to campus.",

  "take the quiz":
    "The quiz is your first step to finding your perfect match! It takes about 5 minutes and helps us understand your preferences. [Take the Quiz](/quiz)",

  "find roommates":
    "To find roommates, take our matching quiz, then browse and swipe on potential matches. Our AI will show you people with compatible lifestyles and preferences. [Start Now](/quiz)",

  "housing tips":
    "1) Start early (3-4 months before semester) 2) Know your budget including utilities 3) Consider commute time 4) Check reviews 5) Visit in person if possible 6) Read the lease carefully",

  "student budgeting":
    "Budget for: Rent ($800-2500), Utilities ($50-150), Internet ($50-80), Groceries ($200-400), Transportation ($100-150), and Entertainment ($100-200). Always set aside emergency funds!",

  help: "I can help with finding housing, matching with roommates, or navigating Homi. What would you like to know?",

  "how it works":
    "Homi works in 3 steps: 1) Take our matching quiz 2) Browse and swipe on personalized recommendations 3) Connect with matches and secure your housing. [Learn More](/how-it-works)",

  universities:
    "We cover all major Ontario schools including UofT, Waterloo, Western, Queen's, McMaster, TMU, York, and Laurier. [See All Universities](/universities)",

  about:
    "Homi was founded by Kabir Saamir, a student who experienced housing challenges firsthand. Our mission is to make student housing safer and better matched to individual needs. [Learn More](/about)",

  default:
    "I'm here to help with student housing questions! Ask me about finding housing, matching with roommates, or using Homi.",
}

// Function to get a response based on user input
export function getResponse(input: string): string {
  const normalizedInput = input.toLowerCase().trim()

  // Check for navigation commands
  if (
    normalizedInput.includes("go to") ||
    normalizedInput.includes("navigate to") ||
    normalizedInput.includes("show me")
  ) {
    if (normalizedInput.includes("quiz") || normalizedInput.includes("get started")) {
      return "I'll help you get to the quiz! Click here: [Take the Quiz](/quiz)"
    }
    if (normalizedInput.includes("how it works")) {
      return "Let me show you how Homi works! [How It Works](/how-it-works)"
    }
    if (normalizedInput.includes("universities")) {
      return "You can explore all our supported universities here: [Universities](/universities)"
    }
    if (normalizedInput.includes("about")) {
      return "Learn more about our story and mission here: [About](/about)"
    }
    if (normalizedInput.includes("dashboard")) {
      return "Let me take you to your dashboard: [Dashboard](/dashboard)"
    }
    if (normalizedInput.includes("swipe")) {
      return "Ready to start swiping? [Find Matches](/swipe)"
    }
  }

  // Check for exact matches in predefined responses
  for (const [key, response] of Object.entries(PREDEFINED_RESPONSES)) {
    if (normalizedInput.includes(key)) {
      return response
    }
  }

  // If no match is found, return the default response
  return PREDEFINED_RESPONSES.default
}
