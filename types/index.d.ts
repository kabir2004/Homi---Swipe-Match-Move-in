declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void
    }
  }
}

export interface University {
  id: string
  name: string
  shortName?: string
  location: string
  description: string
  logo: string
  campusImage: string
  website: string
  founded: number
  studentCount: number
  programs: string[]
  housingOptions: string[]
}

export interface Listing {
  id: string
  title: string
  location: string
  price: number
  photos: string[]
  features: {
    bedrooms: number
    bathrooms: number
    square_feet: number
    amenities: string[]
  }
  match_tags: string[]
  university_distance: Record<string, number>
  created_at: string
}

export const ONTARIO_UNIVERSITIES: University[] = [
  {
    id: "uoft",
    name: "University of Toronto",
    shortName: "UofT",
    location: "Toronto, ON",
    description: "Canada's leading institution of learning, discovery and knowledge creation.",
    logo: "/universities/uoft.svg",
    campusImage: "/campus/uoft-campus.jpg",
    website: "https://www.utoronto.ca",
    founded: 1827,
    studentCount: 93000,
    programs: ["Arts & Science", "Engineering", "Medicine", "Business"],
    housingOptions: ["Residence Halls", "Student Apartments", "Off-Campus Housing"],
  },
  {
    id: "waterloo",
    name: "University of Waterloo",
    shortName: "Waterloo",
    location: "Waterloo, ON",
    description: "A leader in innovation and entrepreneurship with strong connections to industry.",
    logo: "/universities/waterloo.svg",
    campusImage: "/campus/waterloo-campus.jpg",
    website: "https://uwaterloo.ca",
    founded: 1957,
    studentCount: 42000,
    programs: ["Engineering", "Computer Science", "Mathematics", "Environmental Studies"],
    housingOptions: ["Residence Halls", "Student Apartments", "Off-Campus Housing"],
  },
  {
    id: "western",
    name: "Western University",
    shortName: "Western",
    location: "London, ON",
    description: "One of Canada's top research-intensive universities with a picturesque campus.",
    logo: "/universities/western.svg",
    campusImage: "/campus/western-campus.jpg",
    website: "https://www.uwo.ca",
    founded: 1878,
    studentCount: 38000,
    programs: ["Business", "Medicine", "Law", "Arts & Humanities"],
    housingOptions: ["Residence Halls", "Student Apartments", "Off-Campus Housing"],
  },
  {
    id: "queens",
    name: "Queen's University",
    shortName: "Queen's",
    location: "Kingston, ON",
    description: "A historic university known for its strong sense of community and tradition.",
    logo: "/universities/queens.svg",
    campusImage: "/campus/queens-campus.jpg",
    website: "https://www.queensu.ca",
    founded: 1841,
    studentCount: 28000,
    programs: ["Commerce", "Engineering", "Arts & Science", "Health Sciences"],
    housingOptions: ["Residence Halls", "Student Houses", "Off-Campus Housing"],
  },
  {
    id: "mcmaster",
    name: "McMaster University",
    shortName: "McMaster",
    location: "Hamilton, ON",
    description: "A research-intensive university with a focus on innovative teaching and learning.",
    logo: "/universities/mcmaster.svg",
    campusImage: "/campus/mcmaster-campus.jpg",
    website: "https://www.mcmaster.ca",
    founded: 1887,
    studentCount: 33000,
    programs: ["Health Sciences", "Engineering", "Business", "Social Sciences"],
    housingOptions: ["Residence Halls", "Student Apartments", "Off-Campus Housing"],
  },
  {
    id: "tmu",
    name: "Toronto Metropolitan University",
    shortName: "TMU",
    location: "Toronto, ON",
    description: "An urban university focused on innovation and career-ready education.",
    logo: "/universities/tmu.svg",
    campusImage: "/campus/tmu-campus.jpg",
    website: "https://www.torontomu.ca",
    founded: 1948,
    studentCount: 45000,
    programs: ["Media", "Business", "Engineering", "Arts"],
    housingOptions: ["Residence Halls", "Off-Campus Housing"],
  },
  {
    id: "york",
    name: "York University",
    shortName: "York",
    location: "Toronto, ON",
    description: "A large, diverse university with a focus on social justice and accessibility.",
    logo: "/universities/york.svg",
    campusImage: "/campus/york-campus.jpg",
    website: "https://www.yorku.ca",
    founded: 1959,
    studentCount: 55000,
    programs: ["Liberal Arts", "Business", "Fine Arts", "Environmental Studies"],
    housingOptions: ["Residence Halls", "Student Apartments", "Off-Campus Housing"],
  },
  {
    id: "laurier",
    name: "Wilfrid Laurier University",
    shortName: "Laurier",
    location: "Waterloo, ON",
    description: "Known for its strong business program and vibrant student community.",
    logo: "/universities/laurier.svg",
    campusImage: "/campus/laurier-campus.jpg",
    website: "https://www.wlu.ca",
    founded: 1911,
    studentCount: 20000,
    programs: ["Business", "Music", "Arts", "Science"],
    housingOptions: ["Residence Halls", "Student Apartments", "Off-Campus Housing"],
  },
]
