"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, ImageIcon, MoreVertical, Phone, Video } from "lucide-react"

// Mock data for demonstration
const MOCK_CONTACTS = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?key=810ne",
    lastMessage: "Hey, are you still looking for a roommate?",
    time: "10:30 AM",
    unread: 2,
    online: true,
    matchScore: 92,
  },
  {
    id: "2",
    name: "Jamie Smith",
    avatar: "/placeholder.svg?key=ueh2b",
    lastMessage: "I'm interested in the apartment you posted",
    time: "Yesterday",
    unread: 0,
    online: false,
    matchScore: 87,
  },
  {
    id: "3",
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?key=y0jlw",
    lastMessage: "What's your budget for rent?",
    time: "Yesterday",
    unread: 0,
    online: true,
    matchScore: 85,
  },
  {
    id: "4",
    name: "Campus North Group",
    avatar: "",
    lastMessage: "Alex: Let's schedule a viewing for Saturday",
    time: "Jun 10",
    unread: 0,
    online: false,
    isGroup: true,
    members: 4,
  },
]

const MOCK_MESSAGES = [
  {
    id: "1",
    senderId: "1",
    content:
      "Hey there! I saw your profile and we have a 92% match score. Are you still looking for a roommate for the fall semester?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    senderId: "current-user",
    content: "Hi Alex! Yes, I'm still looking. I'm interested in finding a place near campus.",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    senderId: "1",
    content: "That's great! I'm also looking for something close to campus. What's your budget range?",
    timestamp: "10:33 AM",
  },
  {
    id: "4",
    senderId: "current-user",
    content: "I'm looking at around $800-1200 per month, including utilities. How about you?",
    timestamp: "10:35 AM",
  },
  {
    id: "5",
    senderId: "1",
    content:
      "That works for me too! I've actually found a nice 3-bedroom apartment about 10 minutes from campus. It's $2700 total, so about $900 each if we find a third roommate.",
    timestamp: "10:36 AM",
  },
  {
    id: "6",
    senderId: "1",
    content: "Would you be interested in checking it out together? I can send you some photos.",
    timestamp: "10:36 AM",
  },
]

export function RoommateChat() {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedContact, setSelectedContact] = useState(MOCK_CONTACTS[0])
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: String(messages.length + 1),
        senderId: "current-user",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
      scrollToBottom()
    }
  }

  const filteredContacts = MOCK_CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-screen">
      {/* Left Sidebar (Contacts) */}
      <div className="w-80 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Contacts</h2>
          <Input
            type="search"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="h-[calc(100vh-150px)]">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center space-x-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${selectedContact?.id === contact.id ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                onClick={() => setSelectedContact(contact)}
              >
                <Avatar>
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{contact.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{contact.time}</span>
                  {contact.unread > 0 && <Badge className="rounded-full px-2 py-0.5 text-xs">{contact.unread}</Badge>}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center justify-between dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={selectedContact?.avatar || "/placeholder.svg"} />
              <AvatarFallback>{selectedContact?.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{selectedContact?.name}</p>
              {selectedContact?.isGroup ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedContact.members} members</p>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedContact?.online ? "Online" : "Offline"}
                </p>
              )}
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.senderId === "current-user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-xl px-4 py-2 text-sm max-w-xs break-words ${
                    message.senderId === "current-user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                  }`}
                >
                  {message.content}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{message.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="border-t p-4 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1 rounded-full"
            />
            <Button variant="ghost" size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
