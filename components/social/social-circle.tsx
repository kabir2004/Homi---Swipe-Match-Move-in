"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SocialCircleProps {
  circles: any[]
  userId: string
}

export function SocialCircle({ circles, userId }: SocialCircleProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Social Circles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {circles.map((circle) => (
              <div key={circle.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{circle.name}</h3>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {circle.members?.length} members
                  </Badge>
                </div>
                <div className="flex -space-x-2">
                  {circle.members?.map((member: any) => (
                    <Avatar key={member.id} className="border-2 border-white">
                      <AvatarImage
                        src={`/placeholder.svg?key=h06rn&key=hapql&key=ow7k9&height=32&width=32&query=student+portrait+${member.id}`}
                      />
                      <AvatarFallback>{member.first_name?.substring(0, 1) || "U"}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
