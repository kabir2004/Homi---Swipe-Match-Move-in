"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, ImageIcon, MoreVertical, Phone, Video, Search, Users, MessageSquare } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

interface ChatContact {
  id: string
  name: string
  avatar_url: string | null
  last_message: string
  timestamp: string
  unread: number
  online: boolean
  is_group?: boolean
}

interface ChatMessage {
  id: string
  sender_id: string
  content: string
  created_at: string
  sender?: {
    id: string
    first_name: string
    last_name: string
    avatar_url: string | null
  }
}

export function ChatInterface() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("direct")
  const [contacts, setContacts] = useState<ChatContact[]>([])
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = getSupabaseClient()

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch contacts (direct messages and circles)
  useEffect(() => {
    async function fetchContacts() {
      if (!user) return

      try {
        setLoading(true)

        // For demonstration, we'll use mock data
        // In a real app, you would fetch this from the database
        const mockContacts: ChatContact[] = [
          {
            id: "1",
            name: "Alex Johnson",
            avatar_url: null,
            last_message: "Hey, are you still looking for a roommate?",
            timestamp: "10:30 AM",
            unread: 2,
            online: true,
          },
          {
            id: "2",
            name: "Jamie Smith",
            avatar_url: null,
            last_message: "I'm interested in the apartment you posted",
            timestamp: "Yesterday",
            unread: 0,
            online: false,
          },
          {
            id: "3",
            name: "Campus North Group",
            avatar_url: null,
            last_message: "Alex: Let's schedule a viewing for Saturday",
            timestamp: "Jun 10",
            unread: 0,
            online: false,
            is_group: true,
          },
        ]

        setContacts(mockContacts)
        if (mockContacts.length > 0) {
          setSelectedContact(mockContacts[0])
        }
      } catch (err) {
        console.error("Error fetching contacts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [user])

  // Fetch messages when selected contact changes
  useEffect(() => {
    async function fetchMessages() {
      if (!user || !selectedContact) return

      try {
        // For demonstration, we'll use mock data
        // In a real app, you would fetch this from the database
        const mockMessages: ChatMessage[] = [
          {
            id: "1",
            sender_id: selectedContact.id,
            content:
              "Hey there! I saw your profile and we have a high match score. Are you still looking for a roommate for the fall semester?",
            created_at: new Date(Date.now() - 3600000).toISOString(),
            sender: {
              id: selectedContact.id,
              first_name: selectedContact.name.split(" ")[0],
              last_name: selectedContact.name.split(" ")[1] || "",
              avatar_url: selectedContact.avatar_url,
            },
          },
          {
            id: "2",
            sender_id: user.id,
            content: "Hi! Yes, I'm still looking. I'm interested in finding a place near campus.",
            created_at: new Date(Date.now() - 3500000).toISOString(),
          },
          {
            id: "3",
            sender_id: selectedContact.id,
            content: "That's great! I'm also looking for something close to campus. What's your budget range?",
            created_at: new Date(Date.now() - 3400000).toISOString(),
            sender: {
              id: selectedContact.id,
              first_name: selectedContact.name.split(" ")[0],
              last_name: selectedContact.name.split(" ")[1] || "",
              avatar_url: selectedContact.avatar_url,
            },
          },
          {
            id: "4",
            sender_id: user.id,
            content: "I'm looking at around $800-1200 per month, including utilities. How about you?",
            created_at: new Date(Date.now() - 3300000).toISOString(),
          },
        ]

        setMessages(mockMessages)
        scrollToBottom()
      } catch (err) {
        console.error("Error fetching messages:", err)
      }
    }

    fetchMessages()
  }, [selectedContact, user])

  const handleSendMessage = async () => {
    if (!user || !selectedContact || !newMessage.trim()) return

    try {
      // Create a new message object
      const newMsg: ChatMessage = {
        id: `temp-${Date.now()}`,
        sender_id: user.id,
        content: newMessage,
        created_at: new Date().toISOString(),
      }

      // Add to local state immediately for UI responsiveness
      setMessages([...messages, newMsg])
      setNewMessage("")

      // In a real app, you would save this to the database
      // const { data, error } = await supabase
      //   .from("messages")
      //   .insert({
      //     sender_id: user.id,
      //     recipient_id: selectedContact.is_group ? null : selectedContact.id,
      //     circle_id: selectedContact.is_group ? selectedContact.id : null,
      //     content: newMessage,
      //   })
      //   .select()
      //   .single()

      // if (error) throw error

      // Update the contact's last message
      setContacts(
        contacts.map((contact) =>
          contact.id === selectedContact.id
            ? {
                ...contact,
                last_message: newMessage,
                timestamp: "Just now",
              }
            : contact,
        ),
      )

      scrollToBottom()
    } catch (err) {
      console.error("Error sending message:", err)
      alert("Failed to send message. Please try again.")
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    if (activeTab === "direct" && contact.is_group) return false
    if (activeTab === "groups" && !contact.is_group) return false
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-200px)] border rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r bg-gray-50 flex flex-col">
        <div className="p-4 border-b">
          <Tabs defaultValue="direct" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="direct">Direct</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <AnimatePresence>
            {filteredContacts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 text-center"
              >
                <p className="text-gray-500">No conversations found</p>
              </motion.div>
            ) : (
              filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                      selectedContact?.id === contact.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar_url || "/diverse-students-studying.png"} />
                        <AvatarFallback>
                          {contact.is_group ? <Users className="h-4 w-4" /> : contact.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{contact.name}</p>
                        <span className="text-xs text-gray-500">{contact.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{contact.last_message}</p>
                    </div>
                    {contact.unread > 0 && <Badge className="ml-2 bg-primary">{contact.unread}</Badge>}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar_url || "/diverse-students-studying.png"} />
                  <AvatarFallback>
                    {selectedContact.is_group ? <Users className="h-4 w-4" /> : selectedContact.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-xs text-gray-500">{selectedContact.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex space-x-2">
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

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex max-w-[70%]">
                      {message.sender_id !== user?.id && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={message.sender?.avatar_url || "/diverse-students-studying.png"} />
                          <AvatarFallback>
                            {message.sender?.first_name?.[0]}
                            {message.sender?.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender_id === user?.id ? "bg-primary text-white" : "bg-gray-100"
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Conversation Selected</h3>
              <p className="text-gray-500">Choose a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
