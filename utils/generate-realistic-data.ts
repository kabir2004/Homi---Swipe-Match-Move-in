import { faker } from "@faker-js/faker"

// Types for our data
export type Listing = {
  id: string
  type: "listing"
  name: string
  images: string[]
  description: string
  details: {
    price: string
    bedrooms: number
    bathrooms: number
    sqft: string
    furnished: boolean
    [key: string]: string | number | boolean
  }
  tags: string[]
  matchPercentage: number
  location: {
    address: string
    city: string
    distance: string
  }
  amenities: string[]
  landlord: {
    name: string
    rating: number
    responseRate: string
  }
}

export type Roommate = {
  id: string
  type: "roommate"
  name: string
  images: string[]
  description: string
  details: {
    age: number
    gender: string
    occupation: string
    moveInDate: string
    [key: string]: string | number | boolean
  }
  tags: string[]
  matchPercentage: number
  interests: string[]
  lifestyle: {
    cleanliness: number
    noise: number
    guestsFrequency: number
    sleepSchedule: string
  }
  university?: {
    name: string
    program: string
    year: number
  }
}

// Helper function to generate realistic listing images
function generateListingImages(): string[] {
  const categories = [
    "modern apartment",
    "student housing",
    "cozy studio",
    "shared apartment",
    "townhouse",
    "luxury condo",
    "budget apartment",
    "off-campus housing",
  ]

  const randomCategory = faker.helpers.arrayElement(categories)
  const baseWidth = 800
  const baseHeight = 600

  return Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, (_, i) => {
    const query = `${randomCategory} interior ${i === 0 ? "exterior" : ["kitchen", "bedroom", "bathroom", "living room"][i % 4] || "room"}`
    return `/placeholder.svg?height=${baseHeight}&width=${baseWidth}&query=${encodeURIComponent(query)}`
  })
}

// Helper function to generate realistic roommate images
function generateRoommateImages(gender: string): string[] {
  const ethnicity = faker.helpers.arrayElement(["asian", "black", "white", "hispanic", "middle eastern", "south asian"])

  const baseWidth = 800
  const baseHeight = 800

  return Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, (_, i) => {
    const query = `portrait of ${ethnicity} ${gender} student ${i === 0 ? "smiling" : "casual"} hyper realistic`
    return `/placeholder.svg?height=${baseHeight}&width=${baseWidth}&query=${encodeURIComponent(query)}`
  })
}

// Generate listing amenities
function generateAmenities(): string[] {
  const allAmenities = [
    "In-unit Laundry",
    "Dishwasher",
    "Air Conditioning",
    "Heating",
    "Parking",
    "Gym",
    "Pool",
    "Elevator",
    "Balcony",
    "Patio",
    "Rooftop",
    "Security System",
    "Doorman",
    "Pets Allowed",
    "Furnished",
    "Utilities Included",
    "WiFi Included",
    "Cable Included",
    "Garbage Disposal",
    "Microwave",
    "Refrigerator",
    "Stove",
    "Oven",
    "Hardwood Floors",
    "Carpet",
    "Tile Floors",
    "Walk-in Closet",
    "Storage Space",
    "Bike Storage",
    "Package Receiving",
    "Wheelchair Accessible",
    "Study Room",
    "Game Room",
    "BBQ Area",
    "Fire Pit",
    "Outdoor Space",
    "Near Public Transit",
    "Near Campus",
    "Near Grocery Store",
    "Near Restaurants",
  ]

  return faker.helpers.arrayElements(allAmenities, faker.number.int({ min: 5, max: 12 }))
}

// Generate roommate interests
function generateInterests(): string[] {
  const allInterests = [
    "Reading",
    "Writing",
    "Hiking",
    "Biking",
    "Swimming",
    "Running",
    "Yoga",
    "Meditation",
    "Cooking",
    "Baking",
    "Photography",
    "Painting",
    "Drawing",
    "Sculpting",
    "Knitting",
    "Sewing",
    "Gardening",
    "Fishing",
    "Hunting",
    "Camping",
    "Traveling",
    "Music",
    "Singing",
    "Dancing",
    "Acting",
    "Movies",
    "TV Shows",
    "Video Games",
    "Board Games",
    "Card Games",
    "Puzzles",
    "Sports",
    "Basketball",
    "Football",
    "Soccer",
    "Baseball",
    "Tennis",
    "Golf",
    "Volleyball",
    "Skiing",
    "Snowboarding",
    "Surfing",
    "Skateboarding",
    "Rollerblading",
    "Ice Skating",
    "Hockey",
    "Martial Arts",
    "Boxing",
    "Wrestling",
    "Gymnastics",
    "Cheerleading",
    "Track and Field",
    "Cross Country",
    "Weight Lifting",
    "Cycling",
    "Mountain Biking",
    "Rock Climbing",
    "Bouldering",
    "Rafting",
    "Kayaking",
    "Canoeing",
    "Sailing",
    "Windsurfing",
    "Scuba Diving",
    "Snorkeling",
    "Astronomy",
    "Bird Watching",
    "Collecting",
    "Volunteering",
    "Politics",
    "Activism",
    "Religion",
    "Philosophy",
    "History",
    "Science",
    "Technology",
    "Engineering",
    "Mathematics",
    "Literature",
    "Poetry",
    "Foreign Languages",
    "Fashion",
    "Beauty",
    "Makeup",
    "Hair Styling",
    "Nail Art",
    "Tattoos",
    "Piercings",
    "Cars",
    "Motorcycles",
    "Drones",
    "Robotics",
    "Programming",
    "Web Development",
    "App Development",
    "Graphic Design",
    "Interior Design",
    "Architecture",
    "Woodworking",
    "Metalworking",
    "Jewelry Making",
    "Pottery",
    "Glass Blowing",
    "Candle Making",
    "Soap Making",
    "Beer Brewing",
    "Wine Making",
    "Coffee Roasting",
    "Tea Brewing",
    "Cheese Making",
    "Bread Making",
    "Pickling",
    "Canning",
    "Smoking",
    "Grilling",
    "BBQ",
    "Mixology",
    "Bartending",
    "Wine Tasting",
    "Beer Tasting",
    "Whiskey Tasting",
  ]

  return faker.helpers.arrayElements(allInterests, faker.number.int({ min: 3, max: 8 }))
}

// Generate listing tags
function generateListingTags(): string[] {
  const baseTags = [
    "Near Campus",
    "Utilities Included",
    "Newly Renovated",
    "Pet Friendly",
    "Furnished",
    "Private Bathroom",
    "Laundry On-site",
    "Parking Available",
    "Air Conditioning",
    "Heating",
    "Security System",
    "Elevator",
    "Gym",
    "Pool",
    "Rooftop",
    "Balcony",
    "Patio",
    "Dishwasher",
    "Microwave",
    "Hardwood Floors",
    "Carpet",
    "Tile Floors",
    "Walk-in Closet",
    "Storage Space",
    "Bike Storage",
    "Package Receiving",
    "Wheelchair Accessible",
    "Study Room",
    "Game Room",
    "BBQ Area",
    "Fire Pit",
    "Outdoor Space",
    "Near Public Transit",
    "Near Grocery Store",
    "Near Restaurants",
  ]

  return faker.helpers.arrayElements(baseTags, faker.number.int({ min: 4, max: 8 }))
}

// Generate roommate tags
function generateRoommateTags(): string[] {
  const baseTags = [
    "Early Riser",
    "Night Owl",
    "Clean",
    "Organized",
    "Quiet",
    "Social",
    "Studious",
    "Athletic",
    "Creative",
    "Outdoorsy",
    "Tech-Savvy",
    "Foodie",
    "Vegan",
    "Vegetarian",
    "Gluten-Free",
    "Non-Smoker",
    "Smoker",
    "Drinker",
    "Non-Drinker",
    "Pet Owner",
    "Pet Lover",
    "Pet Allergies",
    "International Student",
    "Local Student",
    "Graduate Student",
    "Undergraduate Student",
    "Working Professional",
    "Part-time Student",
    "Full-time Student",
    "Intern",
    "Remote Worker",
  ]

  return faker.helpers.arrayElements(baseTags, faker.number.int({ min: 4, max: 8 }))
}

// Generate university data
function generateUniversity() {
  const universities = [
    {
      name: "University of Toronto",
      programs: ["Computer Science", "Engineering", "Business", "Medicine", "Law", "Arts", "Science"],
    },
    {
      name: "York University",
      programs: ["Business", "Law", "Fine Arts", "Education", "Environmental Studies", "Health"],
    },
    {
      name: "Ryerson University",
      programs: ["Media", "Engineering", "Business", "Arts", "Community Services", "Science"],
    },
    {
      name: "McMaster University",
      programs: ["Health Sciences", "Engineering", "Business", "Humanities", "Science", "Social Sciences"],
    },
    {
      name: "Western University",
      programs: ["Business", "Law", "Medicine", "Engineering", "Arts", "Science", "Music"],
    },
    {
      name: "Queen's University",
      programs: ["Commerce", "Engineering", "Arts", "Science", "Computing", "Health Sciences"],
    },
    {
      name: "University of Waterloo",
      programs: ["Computer Science", "Engineering", "Mathematics", "Science", "Arts", "Environment"],
    },
    {
      name: "Wilfrid Laurier University",
      programs: ["Business", "Music", "Arts", "Science", "Education", "Social Work"],
    },
  ]

  const university = faker.helpers.arrayElement(universities)
  const program = faker.helpers.arrayElement(university.programs)
  const year = faker.number.int({ min: 1, max: 4 })

  return {
    name: university.name,
    program,
    year,
  }
}

// Generate a realistic listing
export function generateListing(index: number): Listing {
  const id = `listing-${index + 1}`
  const gender = faker.helpers.arrayElement(["male", "female"])
  const images = generateListingImages()
  const amenities = generateAmenities()
  const tags = generateListingTags()

  const propertyTypes = ["Apartment", "House", "Townhouse", "Condo", "Studio", "Basement"]
  const propertyType = faker.helpers.arrayElement(propertyTypes)

  const bedrooms = faker.number.int({ min: 1, max: 5 })
  const bathrooms = faker.number.float({ min: 1, max: bedrooms, precision: 0.5 })

  const basePrice = faker.number.int({ min: 800, max: 3000 })
  const price = `$${basePrice.toLocaleString()}/month`

  const sqft = faker.number.int({ min: 400, max: 2000 }).toLocaleString()

  const cities = [
    "Toronto",
    "Mississauga",
    "Scarborough",
    "North York",
    "Etobicoke",
    "Hamilton",
    "London",
    "Kingston",
    "Waterloo",
    "Kitchener",
  ]
  const city = faker.helpers.arrayElement(cities)

  const streets = [
    "University Ave",
    "College St",
    "Queen St",
    "King St",
    "Bloor St",
    "Dundas St",
    "Yonge St",
    "Bay St",
    "Spadina Ave",
    "Bathurst St",
  ]
  const street = faker.helpers.arrayElement(streets)

  const address = `${faker.number.int({ min: 100, max: 999 })} ${street}`

  const distance = `${faker.number.int({ min: 1, max: 30 })} min to campus`

  const description = `${faker.helpers.arrayElement(["Beautiful", "Spacious", "Cozy", "Modern", "Charming", "Luxurious"])} ${propertyType.toLowerCase()} with ${bedrooms} bed${bedrooms > 1 ? "s" : ""} and ${bathrooms} bath${bathrooms > 1 ? "s" : ""} in ${city}. ${faker.lorem.sentences(2)}`

  return {
    id,
    type: "listing",
    name: `${propertyType} near ${faker.helpers.arrayElement(["Campus", "Downtown", "University", "College", "Park", "Station"])}`,
    images,
    description,
    details: {
      price,
      bedrooms,
      bathrooms,
      sqft,
      furnished: faker.datatype.boolean(),
      "Property Type": propertyType,
      "Lease Term": faker.helpers.arrayElement(["12 months", "8 months", "4 months", "Flexible"]),
      "Available From": faker.date
        .future()
        .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    tags,
    matchPercentage: faker.number.int({ min: 70, max: 99 }),
    location: {
      address,
      city,
      distance,
    },
    amenities,
    landlord: {
      name: faker.person.fullName(),
      rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
      responseRate: `${faker.number.int({ min: 80, max: 100 })}%`,
    },
  }
}

// Generate a realistic roommate
export function generateRoommate(index: number): Roommate {
  const id = `roommate-${index + 1}`
  const gender = faker.helpers.arrayElement(["male", "female"])
  const images = generateRoommateImages(gender)
  const interests = generateInterests()
  const tags = generateRoommateTags()
  const university = generateUniversity()

  const age = faker.number.int({ min: 18, max: 30 })
  const occupation = faker.helpers.arrayElement([
    "Student",
    "Student",
    "Student",
    "Student",
    "Intern",
    "Part-time Worker",
    "Graduate Student",
  ])

  const firstName = gender === "male" ? faker.person.firstName("male") : faker.person.firstName("female")
  const lastName = faker.person.lastName()

  const description = `${faker.helpers.arrayElement(["Friendly", "Outgoing", "Quiet", "Studious", "Easygoing", "Responsible"])} ${occupation.toLowerCase()} studying ${university.program} at ${university.name}. ${faker.lorem.sentences(2)}`

  return {
    id,
    type: "roommate",
    name: `${firstName} ${lastName.charAt(0)}.`,
    images,
    description,
    details: {
      age,
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      occupation,
      moveInDate: faker.date.future().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      Budget: `$${faker.number.int({ min: 600, max: 1500 })}/month`,
      Duration: faker.helpers.arrayElement(["12 months", "8 months", "4 months", "Flexible"]),
      "Preferred Location": faker.helpers.arrayElement([
        "Near Campus",
        "Downtown",
        "Midtown",
        "Uptown",
        "East End",
        "West End",
      ]),
    },
    tags,
    matchPercentage: faker.number.int({ min: 70, max: 99 }),
    interests,
    lifestyle: {
      cleanliness: faker.number.int({ min: 1, max: 5 }),
      noise: faker.number.int({ min: 1, max: 5 }),
      guestsFrequency: faker.number.int({ min: 1, max: 5 }),
      sleepSchedule: faker.helpers.arrayElement(["Early Bird", "Night Owl", "Regular Schedule", "Irregular Schedule"]),
    },
    university,
  }
}

// Generate multiple listings
export function generateListings(count = 50): Listing[] {
  return Array.from({ length: count }, (_, i) => generateListing(i))
}

// Generate multiple roommates
export function generateRoommates(count = 50): Roommate[] {
  return Array.from({ length: count }, (_, i) => generateRoommate(i))
}
