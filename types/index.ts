export interface QuizQuestion {
  key: string
  question: string
  type: "single" | "multiple" | "range" | "text"
  options?: string[]
  min?: number
  max?: number
}

// Update the Listing interface to include the new fields
export interface Listing {
  id: string
  title: string
  location: string
  price: number | { min: number; max: number }
  photos: string[]
  features: {
    bedrooms: number
    bathrooms: number
    square_feet: number
    amenities: string[]
  }
  match_tags: string[]
  university_distance?: {
    [key: string]: number // Distance in km to universities
  }
  created_at: string
  description?: string
  neighborhood?: string
  transit_options?: string[]
  virtual_tour_url?: string
  // New fields
  university: string
  city: string
  latitude: number
  longitude: number
  walk_distance: number
  drive_distance: number
  maps_url: string
  is_room_only?: boolean
}

export interface Roommate {
  id: string
  name: string
  photo: string
  tags: string[]
  intro_bio: string
  match_score: number
  created_at: string
  university?: string
  program?: string
  year?: number
  interests?: string[]
  lifestyle_preferences?: {
    cleanliness: number // 1-5
    noise_level: number // 1-5
    guests: number // 1-5
    sleep_schedule: "early_bird" | "night_owl" | "flexible"
  }
}

// Update the University interface to include campusImage
export interface University {
  id: string
  name: string
  shortName: string
  location: string
  city: string
  province: string
  campusAreas: string[]
  logo: string
  campusImage: string // Make this required
}

// Update the ONTARIO_UNIVERSITIES array with correct campus images
export const ONTARIO_UNIVERSITIES: University[] = [
  {
    id: "uoft",
    name: "University of Toronto",
    shortName: "UofT",
    location: "27 King's College Cir, Toronto, ON M5S 1A1",
    city: "Toronto",
    province: "Ontario",
    campusAreas: ["St. George", "Scarborough", "Mississauga"],
    logo: "/universities/uoft.svg",
    campusImage: "/campus/uoft-campus.jpg",
  },
  {
    id: "waterloo",
    name: "University of Waterloo",
    shortName: "Waterloo",
    location: "200 University Ave W, Waterloo, ON N2L 3G1",
    city: "Waterloo",
    province: "Ontario",
    campusAreas: ["Main Campus", "Health Sciences Campus"],
    logo: "/universities/waterloo.svg",
    campusImage: "/campus/waterloo-campus.jpg",
  },
  {
    id: "western",
    name: "Western University",
    shortName: "Western",
    location: "1151 Richmond St, London, ON N6A 3K7",
    city: "London",
    province: "Ontario",
    campusAreas: ["Main Campus", "Downtown"],
    logo: "/universities/western.svg",
    campusImage: "/campus/western-campus.jpg",
  },
  {
    id: "queens",
    name: "Queen's University",
    shortName: "Queen's",
    location: "99 University Ave, Kingston, ON K7L 3N6",
    city: "Kingston",
    province: "Ontario",
    campusAreas: ["Main Campus", "West Campus"],
    logo: "/universities/queens.svg",
    campusImage: "/campus/queens-campus.jpg",
  },
  {
    id: "mcmaster",
    name: "McMaster University",
    shortName: "McMaster",
    location: "1280 Main St W, Hamilton, ON L8S 4L8",
    city: "Hamilton",
    province: "Ontario",
    campusAreas: ["Main Campus", "Health Sciences"],
    logo: "/universities/mcmaster.svg",
    campusImage: "/campus/mcmaster-campus.jpg",
  },
  {
    id: "ryerson",
    name: "Toronto Metropolitan University",
    shortName: "TMU",
    location: "350 Victoria St, Toronto, ON M5B 2K3",
    city: "Toronto",
    province: "Ontario",
    campusAreas: ["Downtown Campus"],
    logo: "/universities/tmu.svg",
    campusImage: "/campus/tmu-campus.jpg",
  },
  {
    id: "york",
    name: "York University",
    shortName: "York",
    location: "4700 Keele St, Toronto, ON M3J 1P3",
    city: "Toronto",
    province: "Ontario",
    campusAreas: ["Keele Campus", "Glendon Campus"],
    logo: "/universities/york.svg",
    campusImage: "/campus/york-campus.jpg",
  },
  {
    id: "laurier",
    name: "Wilfrid Laurier University",
    shortName: "Laurier",
    location: "75 University Ave W, Waterloo, ON N2L 3C5",
    city: "Waterloo",
    province: "Ontario",
    campusAreas: ["Waterloo Campus", "Brantford Campus"],
    logo: "/universities/laurier.svg",
    campusImage: "/campus/laurier-campus.jpg",
  },
]

export interface RoommateProfile {
  id: string
  name: string
  age: number
  gender: string
  university: string
  program: string
  year: number | string
  bio: string
  hobbies: string[]
  profileImage: string
  cleanliness: number
  noise: number
  socialLevel: number
  sleepSchedule: string
  studyHabits: string
  guests: string
  smoking: boolean
  drinking: string
  pets: string
  cooking: string
  sharedItems: string
  personality: string
  budget: string
  moveInDate: string
  leaseLength: string
  location: string
}
