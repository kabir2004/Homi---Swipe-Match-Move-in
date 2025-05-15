"use client"

import { PageTransition } from "@/components/page-transition"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>

        <Card>
          <CardContent className="p-6">
            <p>Welcome to your profile page!</p>
            <p className="mt-2">Please log in to view your profile details.</p>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
