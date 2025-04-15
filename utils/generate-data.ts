import type { Listing, Roommate } from "@/types"

// University names for reference
const universities = [
  "University of Toronto",
  "University of Waterloo",
  "Western University",
  "Queen's University",
  "McMaster University",
  "Toronto Metropolitan University",
  "York University",
  "Wilfrid Laurier University",
]

// Neighborhoods by city
const neighborhoods = {
  Toronto: [
    "The Annex",
    "Kensington Market",
    "Harbourfront",
    "Liberty Village",
    "Yorkville",
    "Chinatown",
    "Leslieville",
    "Cabbagetown",
    "Bloor West Village",
    "Danforth",
  ],
  Waterloo: [
    "Uptown Waterloo",
    "University District",
    "Lakeshore",
    "Beechwood",
    "Eastbridge",
    "Laurelwood",
    "Lincoln Heights",
    "Westvale",
  ],
  London: ["Downtown London", "Old North", "Masonville", "Byron", "Westmount", "Oakridge", "Old South", "Woodfield"],
  Kingston: ["Downtown Kingston", "Queen's Campus", "Portsmouth Village", "Alwington", "Kingscourt", "Strathcona Park"],
  Hamilton: ["Westdale", "Ainslie Wood", "Durand", "Kirkendall", "Strathcona", "Corktown", "Beasley"],
}

// Street names by city
const streets = {
  Toronto: [
    "Bloor Street",
    "Spadina Avenue",
    "College Street",
    "Bathurst Street",
    "Queen Street",
    "King Street",
    "Dundas Street",
    "Bay Street",
    "Yonge Street",
    "St. George Street",
  ],
  Waterloo: [
    "University Avenue",
    "King Street",
    "Columbia Street",
    "Albert Street",
    "Lester Street",
    "Phillip Street",
    "Hazel Street",
    "Hickory Street",
  ],
  London: [
    "Richmond Street",
    "Oxford Street",
    "Wharncliffe Road",
    "Western Road",
    "Sarnia Road",
    "Fanshawe Park Road",
    "Wonderland Road",
  ],
  Kingston: [
    "Princess Street",
    "Johnson Street",
    "Earl Street",
    "Brock Street",
    "Division Street",
    "University Avenue",
    "King Street",
  ],
  Hamilton: [
    "Main Street",
    "King Street",
    "Sterling Street",
    "Emerson Street",
    "Forsyth Avenue",
    "Dalewood Avenue",
    "Longwood Road",
  ],
}

// Listing titles
const listingTitles = [
  "Cozy Studio Apartment",
  "Modern 1BR with Balcony",
  "Spacious 2BR near Campus",
  "Renovated 3BR Townhouse",
  "Luxury Student Apartment",
  "Bright Studio with Utilities Included",
  "Furnished 1BR in Student Building",
  "Shared Student House",
  "Newly Renovated Basement Apartment",
  "Penthouse with Amazing Views",
  "Budget-Friendly Studio",
  "Pet-Friendly 2BR Apartment",
  "All-Inclusive Student Suite",
  "Character Home with 4 Bedrooms",
  "Executive Condo near University",
]

// Listing amenities
const amenities = [
  "In-unit Laundry",
  "Dishwasher",
  "Air Conditioning",
  "Balcony",
  "Gym",
  "Pool",
  "Parking",
  "Pet Friendly",
  "Furnished",
  "Utilities Included",
  "High-Speed Internet",
  "Security System",
  "Bike Storage",
  "Study Room",
  "Rooftop Patio",
  "Concierge",
  "Storage Locker",
  "Smart Home Features",
  "Hardwood Floors",
  "Stainless Steel Appliances",
]

// Listing tags
const listingTags = [
  "Close to Campus",
  "Public Transit",
  "Quiet Area",
  "Near Restaurants",
  "Grocery Nearby",
  "Student Housing",
  "All Inclusive",
  "Furnished",
  "Modern",
  "Luxury",
  "Budget Friendly",
  "Utilities Included",
  "Recently Renovated",
  "Roommate Friendly",
  "Near Shops",
  "Near Parks",
  "Walkable Area",
  "Bike Friendly",
  "Safe Neighborhood",
  "Energy Efficient",
]

// Transit options
const transitOptions = [
  "5 min walk to subway station",
  "Bus stop right outside",
  "Streetcar stop nearby",
  "10 min walk to train station",
  "Bike lanes on adjacent streets",
  "University shuttle stop nearby",
  "Car share parking on premises",
  "15 min bus ride to campus",
  "Direct bus to downtown",
  "Subway connection to campus",
]

// Roommate names
const roomateFirstNames = [
  "Alex",
  "Jordan",
  "Taylor",
  "Morgan",
  "Casey",
  "Riley",
  "Avery",
  "Quinn",
  "Jamie",
  "Skyler",
  "Sam",
  "Charlie",
  "Hayden",
  "Dakota",
  "Reese",
  "Finley",
  "Blake",
  "Parker",
  "Cameron",
  "Rowan",
  "Sasha",
  "Jesse",
  "Kai",
  "Remy",
  "Ari",
  "Emerson",
  "Phoenix",
  "Sage",
  "Tatum",
  "Shawn",
  "Aiden",
  "Emma",
  "Noah",
  "Olivia",
  "Liam",
  "Sophia",
  "Jackson",
  "Mia",
  "Lucas",
  "Isabella",
  "Ethan",
  "Amelia",
  "Mason",
  "Harper",
  "Logan",
  "Evelyn",
  "Elijah",
  "Abigail",
  "Oliver",
  "Emily",
]

const roomateLastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
]

// University programs
const programs = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Psychology",
  "Biology",
  "English Literature",
  "Political Science",
  "Economics",
  "Mathematics",
  "Chemistry",
  "Physics",
  "Sociology",
  "History",
  "Art & Design",
  "Communications",
  "Nursing",
  "Education",
  "Environmental Science",
  "Architecture",
  "Music",
  "Film Studies",
  "Philosophy",
  "Anthropology",
  "Kinesiology",
  "Health Sciences",
]

// Roommate tags
const roommateTags = [
  "Early Riser",
  "Night Owl",
  "Clean",
  "Organized",
  "Quiet",
  "Social",
  "Studious",
  "Athletic",
  "Artistic",
  "Foodie",
  "Gamer",
  "Musician",
  "Vegan/Vegetarian",
  "Pet Owner",
  "International Student",
  "Grad Student",
  "Non-Smoker",
  "Eco-Friendly",
  "Tech Enthusiast",
  "Bookworm",
]

// Roommate interests
const interests = [
  "Reading",
  "Cooking",
  "Hiking",
  "Photography",
  "Video Games",
  "Movies",
  "Music",
  "Sports",
  "Yoga",
  "Travel",
  "Art",
  "Dancing",
  "Cycling",
  "Running",
  "Swimming",
  "Board Games",
  "Volunteering",
  "Coding",
  "Gardening",
  "Meditation",
]

// Roommate bios
const bioParts = {
  intro: [
    "Hey there! I'm a",
    "Hi! I'm currently studying",
    "Hello future roommates! I'm a",
    "Nice to meet you! I'm a",
    "Looking for a great roommate? I'm a",
  ],
  middle: [
    "student who loves",
    "student passionate about",
    "student balancing academics and",
    "student who enjoys",
    "student focusing on academics while enjoying",
  ],
  activities: [
    "exploring the city on weekends",
    "trying new restaurants and cafes",
    "staying active through sports and fitness",
    "attending campus events and activities",
    "quiet evenings with a good book or movie",
  ],
  roommate: [
    "I'm looking for a roommate who is respectful of space and clean.",
    "Hoping to find a roommate who shares similar interests but also respects privacy.",
    "Ideal roommate would be friendly, clean, and considerate.",
    "Looking for someone who is organized and communicative.",
    "Would love to live with someone who is both studious and social.",
  ],
}

// Helper functions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split("T")[0]
}

function generateRandomBio(): string {
  return `${getRandomElement(bioParts.intro)} ${getRandomElement(programs)} ${getRandomElement(bioParts.middle)} ${getRandomElement(bioParts.activities)}. ${getRandomElement(bioParts.roommate)}`
}

function getRandomLocation(city: string): string {
  const neighborhood = getRandomElement(neighborhoods[city as keyof typeof neighborhoods] || ["Downtown"])
  const street = getRandomElement(streets[city as keyof typeof streets] || ["Main Street"])
  return `${street}, ${neighborhood}, ${city}`
}

function getCityFromUniversity(university: string): string {
  if (university.includes("Toronto") || university.includes("York")) return "Toronto"
  if (university.includes("Waterloo") || university.includes("Laurier")) return "Waterloo"
  if (university.includes("Western")) return "London"
  if (university.includes("Queen's")) return "Kingston"
  if (university.includes("McMaster")) return "Hamilton"
  return "Toronto" // Default
}

// Generate listings
export function generateListings(count = 50): Listing[] {
  const listings: Listing[] = []
  const now = new Date()
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())

  for (let i = 0; i < count; i++) {
    const university = getRandomElement(universities)
    const city = getCityFromUniversity(university)
    const location = getRandomLocation(city)
    const bedrooms = Math.random() > 0.2 ? getRandomInt(1, 4) : 0 // 20% chance of studio (0 BR)
    const bathrooms = bedrooms === 0 ? 1 : getRandomInt(1, bedrooms + 1)
    const squareFeet = bedrooms === 0 ? getRandomInt(300, 500) : getRandomInt(500, 300 * (bedrooms + 1))

    // Calculate price based on bedrooms, location, and some randomness
    let basePrice = 0
    if (city === "Toronto") basePrice = 1800
    else if (city === "Waterloo") basePrice = 1200
    else if (city === "London") basePrice = 1100
    else if (city === "Kingston") basePrice = 1300
    else if (city === "Hamilton") basePrice = 1400
    else basePrice = 1500

    const price = Math.round((basePrice + bedrooms * 400 + (Math.random() * 300 - 150)) / 50) * 50

    // University distances
    const universityDistance: Record<string, number> = {}
    universityDistance[university.split(" ").slice(-1)[0]] = Number.parseFloat((Math.random() * 3).toFixed(1))

    // If in Waterloo, add distance to both universities
    if (city === "Waterloo") {
      universityDistance["Waterloo"] = Number.parseFloat((Math.random() * 3).toFixed(1))
      universityDistance["Laurier"] = Number.parseFloat((Math.random() * 3).toFixed(1))
    }

    const listing: Listing = {
      id: `listing-${i + 1}`,
      title: getRandomElement(listingTitles),
      location,
      price,
      photos: [`/placeholder.svg?height=400&width=600&text=Listing+${i + 1}`],
      features: {
        bedrooms,
        bathrooms,
        square_feet: squareFeet,
        amenities: getRandomElements(amenities, getRandomInt(3, 8)),
      },
      match_tags: getRandomElements(listingTags, getRandomInt(3, 6)),
      university_distance: universityDistance,
      created_at: getRandomDate(sixMonthsAgo, now),
      description: `This ${bedrooms === 0 ? "studio" : bedrooms + " bedroom"} apartment is located in ${location}, just ${universityDistance[Object.keys(universityDistance)[0]]} km from ${university}. It features ${squareFeet} square feet of living space with ${bathrooms} bathroom${bathrooms > 1 ? "s" : ""}.`,
      neighborhood: `Located in the ${getRandomElement(neighborhoods[city as keyof typeof neighborhoods] || ["Downtown"])} area, you'll be close to shops, restaurants, and public transit.`,
      transit_options: getRandomElements(transitOptions, getRandomInt(2, 4)),
    }

    listings.push(listing)
  }

  return listings
}

// Generate roommates
export function generateRoommates(count = 50): Roommate[] {
  const roommates: Roommate[] = []
  const now = new Date()
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())

  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(roomateFirstNames)
    const lastName = getRandomElement(roomateLastNames)
    const name = `${firstName} ${lastName}`
    const university = getRandomElement(universities)
    const program = getRandomElement(programs)
    const year = getRandomInt(1, 5)
    const matchScore = getRandomInt(60, 98)

    const roommate: Roommate = {
      id: `roommate-${i + 1}`,
      name,
      photo: `/placeholder.svg?height=200&width=200&text=${firstName}`,
      tags: getRandomElements(roommateTags, getRandomInt(3, 5)),
      intro_bio: generateRandomBio(),
      match_score: matchScore,
      created_at: getRandomDate(sixMonthsAgo, now),
      university,
      program,
      year,
      interests: getRandomElements(interests, getRandomInt(3, 6)),
      lifestyle_preferences: {
        cleanliness: getRandomInt(1, 5),
        noise_level: getRandomInt(1, 5),
        guests: getRandomInt(1, 5),
        sleep_schedule: getRandomElement(["early_bird", "night_owl", "flexible"]),
      },
    }

    roommates.push(roommate)
  }

  return roommates
}

// Calculate match ratio
export function calculateMatchRatio(currentIndex: number, totalItems: number): string {
  const percentage = Math.round((currentIndex / totalItems) * 100)
  return `${currentIndex}/${totalItems} (${percentage}%)`
}
