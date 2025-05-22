"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MessageCircle, ThumbsDown, ThumbsUp, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Sample roommate data
const potentialRoommates = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 20,
    year: "Sophomore",
    major: "Computer Science",
    bio: "Early riser, clean, and quiet. I enjoy coding and hiking on weekends.",
    interests: ["Technology", "Hiking", "Reading"],
    compatibility: 85,
    image: "/diverse-student-portraits.png",
    contacted: false,
    matched: false,
  },
  {
    id: 2,
    name: "Jamie Smith",
    age: 21,
    year: "Junior",
    major: "Business",
    bio: "Outgoing and social, but respectful of quiet hours. Love cooking and sports.",
    interests: ["Cooking", "Basketball", "Movies"],
    compatibility: 72,
    image: "/college-student-portrait.png",
    contacted: false,
    matched: false,
  },
  {
    id: 3,
    name: "Taylor Wilson",
    age: 19,
    year: "Freshman",
    major: "Psychology",
    bio: "Night owl, neat, and organized. Enjoy music and art in my free time.",
    interests: ["Music", "Art", "Psychology"],
    compatibility: 91,
    image: "/university-student-portrait.png",
    contacted: false,
    matched: false,
  },
  {
    id: 4,
    name: "Jordan Lee",
    age: 22,
    year: "Senior",
    major: "Engineering",
    bio: "Balanced between studying and socializing. Looking for a drama-free living situation.",
    interests: ["Engineering", "Video Games", "Fitness"],
    compatibility: 68,
    image: "/engineering-student-portrait.png",
    contacted: false,
    matched: false,
  },
]

// Sample messages
const sampleMessages = [
  {
    id: 1,
    roommateId: 1,
    messages: [
      {
        sender: "them",
        text: "Hey! I saw we matched as potential roommates. What are you looking for in a living situation?",
        time: "2 days ago",
      },
      {
        sender: "you",
        text: "Hi Alex! I'm looking for someone clean and respectful of quiet hours for studying. What about you?",
        time: "2 days ago",
      },
      {
        sender: "them",
        text: "That sounds perfect! I'm an early riser but very quiet. Do you have a specific area in mind?",
        time: "1 day ago",
      },
    ],
  },
  {
    id: 2,
    roommateId: 3,
    messages: [
      {
        sender: "them",
        text: "Hello! I think we might be compatible roommates. Are you still looking?",
        time: "3 days ago",
      },
      {
        sender: "you",
        text: "Hi Taylor! Yes, I am. I noticed you're a night owl - I usually go to bed around 11pm. Would that be an issue?",
        time: "3 days ago",
      },
      {
        sender: "them",
        text: "Not at all! I'm quiet when others are sleeping. What's your budget range for rent?",
        time: "2 days ago",
      },
      {
        sender: "you",
        text: "I'm looking at places between $800-1000 per month. Does that work for you?",
        time: "2 days ago",
      },
    ],
  },
]

export function RoommatesPage() {
  const [roommates, setRoommates] = useState(potentialRoommates)
  const [activeTab, setActiveTab] = useState("discover")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    earlyRiser: false,
    nightOwl: false,
    studious: true,
    social: false,
    clean: true,
  })
  const [conversations, setConversations] = useState(sampleMessages)
  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")

  // Toggle contacted status
  const toggleContacted = (id: number) => {
    setRoommates(
      roommates.map((roommate) => (roommate.id === id ? { ...roommate, contacted: !roommate.contacted } : roommate)),
    )

    // If not already contacted, create a new conversation
    if (!roommates.find((r) => r.id === id)?.contacted) {
      const existingConvo = conversations.find((c) => c.roommateId === id)
      if (!existingConvo) {
        setConversations([
          ...conversations,
          {
            id: conversations.length + 1,
            roommateId: id,
            messages: [],
          },
        ])
      }
    }
  }

  // Toggle matched status
  const toggleMatched = (id: number) => {
    setRoommates(
      roommates.map((roommate) => (roommate.id === id ? { ...roommate, matched: !roommate.matched } : roommate)),
    )
  }

  // Filter roommates based on search and filters
  const filteredRoommates = roommates.filter((roommate) => {
    // Search term filter
    if (
      searchTerm &&
      !roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !roommate.major.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !roommate.bio.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Get contacted roommates
  const contactedRoommates = roommates.filter((roommate) => roommate.contacted)

  // Get matched roommates
  const matchedRoommates = roommates.filter((roommate) => roommate.matched)

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return

    setConversations(
      conversations.map((convo) =>
        convo.roommateId === activeConversation
          ? {
              ...convo,
              messages: [...convo.messages, { sender: "you", text: newMessage, time: "Just now" }],
            }
          : convo,
      ),
    )

    setNewMessage("")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="matched">Matched</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <Input
                      id="search"
                      placeholder="Search roommates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferences</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="earlyRiser"
                          checked={filters.earlyRiser}
                          onCheckedChange={(checked) => setFilters({ ...filters, earlyRiser: checked })}
                        />
                        <Label htmlFor="earlyRiser">Early Riser</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="nightOwl"
                          checked={filters.nightOwl}
                          onCheckedChange={(checked) => setFilters({ ...filters, nightOwl: checked })}
                        />
                        <Label htmlFor="nightOwl">Night Owl</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="studious"
                          checked={filters.studious}
                          onCheckedChange={(checked) => setFilters({ ...filters, studious: checked })}
                        />
                        <Label htmlFor="studious">Studious</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="social"
                          checked={filters.social}
                          onCheckedChange={(checked) => setFilters({ ...filters, social: checked })}
                        />
                        <Label htmlFor="social">Social</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="clean"
                          checked={filters.clean}
                          onCheckedChange={(checked) => setFilters({ ...filters, clean: checked })}
                        />
                        <Label htmlFor="clean">Clean</Label>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setFilters({
                        earlyRiser: false,
                        nightOwl: false,
                        studious: false,
                        social: false,
                        clean: false,
                      })
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-3/4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRoommates.map((roommate) => (
                  <Card key={roommate.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={roommate.image || "/placeholder.svg"} alt={roommate.name} />
                            <AvatarFallback>
                              {roommate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{roommate.name}</CardTitle>
                            <CardDescription>
                              {roommate.age} • {roommate.year} • {roommate.major}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          className={
                            roommate.compatibility >= 80
                              ? "bg-green-100 text-green-800"
                              : roommate.compatibility >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {roommate.compatibility}% Match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compatibility</span>
                          <span>{roommate.compatibility}%</span>
                        </div>
                        <Progress value={roommate.compatibility} className="h-2" />
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{roommate.bio}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {roommate.interests.map((interest, index) => (
                          <Badge key={index} variant="outline">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Simulate disliking by removing from the list
                            setRoommates(roommates.filter((r) => r.id !== roommate.id))
                          }}
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" /> Pass
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleMatched(roommate.id)}>
                          <ThumbsUp className="h-4 w-4 mr-1" /> {roommate.matched ? "Matched" : "Match"}
                        </Button>
                      </div>
                      <Button
                        variant={roommate.contacted ? "outline" : "default"}
                        size="sm"
                        onClick={() => {
                          toggleContacted(roommate.id)
                          setActiveTab("messages")
                          setActiveConversation(roommate.id)
                        }}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" /> {roommate.contacted ? "Message" : "Contact"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredRoommates.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">No roommates match your search criteria.</p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setFilters({
                        earlyRiser: false,
                        nightOwl: false,
                        studious: false,
                        social: false,
                        clean: false,
                      })
                    }}
                  >
                    Reset Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {contactedRoommates.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-4 h-[600px]">
              <div className="w-full md:w-1/3 overflow-y-auto">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Conversations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {contactedRoommates.map((roommate) => {
                        const convo = conversations.find((c) => c.roommateId === roommate.id)
                        const lastMessage = convo?.messages[convo.messages.length - 1]

                        return (
                          <div
                            key={roommate.id}
                            className={`p-4 cursor-pointer hover:bg-gray-50 ${activeConversation === roommate.id ? "bg-gray-50" : ""}`}
                            onClick={() => setActiveConversation(roommate.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={roommate.image || "/placeholder.svg"} alt={roommate.name} />
                                <AvatarFallback>
                                  {roommate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{roommate.name}</p>
                                <p className="text-sm text-gray-500 truncate">
                                  {lastMessage
                                    ? `${lastMessage.sender === "you" ? "You: " : ""}${lastMessage.text}`
                                    : "Start a conversation"}
                                </p>
                              </div>
                              {lastMessage && <span className="text-xs text-gray-400">{lastMessage.time}</span>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-2/3">
                <Card className="h-full flex flex-col">
                  {activeConversation ? (
                    <>
                      <CardHeader className="border-b">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={roommates.find((r) => r.id === activeConversation)?.image || "/placeholder.svg"}
                              alt={roommates.find((r) => r.id === activeConversation)?.name}
                            />
                            <AvatarFallback>
                              {roommates
                                .find((r) => r.id === activeConversation)
                                ?.name.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{roommates.find((r) => r.id === activeConversation)?.name}</CardTitle>
                            <CardDescription>
                              {roommates.find((r) => r.id === activeConversation)?.year} •{" "}
                              {roommates.find((r) => r.id === activeConversation)?.major}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {conversations.find((c) => c.roommateId === activeConversation)?.messages.length ? (
                          conversations
                            .find((c) => c.roommateId === activeConversation)
                            ?.messages.map((message, index) => (
                              <div
                                key={index}
                                className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[70%] rounded-lg p-3 ${
                                    message.sender === "you" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  <p>{message.text}</p>
                                  <p
                                    className={`text-xs mt-1 ${
                                      message.sender === "you" ? "text-blue-100" : "text-gray-500"
                                    }`}
                                  >
                                    {message.time}
                                  </p>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <p className="text-gray-500">
                              Start a conversation with {roommates.find((r) => r.id === activeConversation)?.name}
                            </p>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="border-t p-4">
                        <div className="flex w-full space-x-2">
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                sendMessage()
                              }
                            }}
                          />
                          <Button onClick={sendMessage}>Send</Button>
                        </div>
                      </CardFooter>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center p-8">
                        <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Conversation Selected</h3>
                        <p className="text-gray-500">Select a conversation from the list to start messaging</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">You haven't contacted any potential roommates yet.</p>
              <Button className="mt-4" onClick={() => setActiveTab("discover")}>
                Discover Roommates
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="matched" className="space-y-4">
          {matchedRoommates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedRoommates.map((roommate) => (
                <Card key={roommate.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={roommate.image || "/placeholder.svg"} alt={roommate.name} />
                          <AvatarFallback>
                            {roommate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{roommate.name}</CardTitle>
                          <CardDescription>
                            {roommate.age} • {roommate.year} • {roommate.major}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Matched</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Compatibility</span>
                        <span>{roommate.compatibility}%</span>
                      </div>
                      <Progress value={roommate.compatibility} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{roommate.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {roommate.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={() => toggleMatched(roommate.id)}>
                      <X className="h-4 w-4 mr-1" /> Unmatch
                    </Button>
                    <Button
                      variant={roommate.contacted ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        toggleContacted(roommate.id)
                        setActiveTab("messages")
                        setActiveConversation(roommate.id)
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" /> {roommate.contacted ? "Message" : "Contact"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">You haven't matched with any roommates yet.</p>
              <Button className="mt-4" onClick={() => setActiveTab("discover")}>
                Discover Roommates
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
