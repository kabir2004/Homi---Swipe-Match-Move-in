"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoommateMatches } from "@/components/roommates/roommate-matches"
import { SocialCircles } from "@/components/social/social-circles"
import { ChatInterface } from "@/components/chat/chat-interface"
import { PageTransition } from "@/components/page-transition"
import { Users, MessageSquare, UserPlus } from "lucide-react"

export default function SocialPage() {
  const { user, profile } = useAuth()
  const [activeTab, setActiveTab] = useState("matches")

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Social Hub</h1>

        <Tabs defaultValue="matches" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-100 shadow-sm">
            <TabsTrigger value="matches" className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary">
              <UserPlus className="h-4 w-4 mr-2" />
              Roommate Matches
            </TabsTrigger>
            <TabsTrigger value="circles" className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary">
              <Users className="h-4 w-4 mr-2" />
              Social Circles
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <RoommateMatches />
          </TabsContent>

          <TabsContent value="circles" className="space-y-6">
            <SocialCircles />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <ChatInterface />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
