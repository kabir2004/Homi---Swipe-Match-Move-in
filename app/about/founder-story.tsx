"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Quote } from "lucide-react"

export default function FounderStory() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">Founder's Story</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Why I Started Homi</h1>

            <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
              <div className="md:w-1/3 shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-xl overflow-hidden"
                >
                  <Image
                    src="/placeholder.svg?height=400&width=300&text=Kabir+Saamir"
                    alt="Kabir Saamir, Founder of Homi"
                    width={300}
                    height={400}
                    className="object-cover"
                  />
                </motion.div>
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-lg">Kabir Saamir</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="relative mb-8">
                  <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" />
                  <p className="text-xl font-medium text-gray-700 italic">
                    I started Homi because I believe every student deserves a safe, affordable place to call home during
                    their university years. This isn't just a business for me—it's deeply personal.
                  </p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p>
                    When I moved to Toronto to attend university, I experienced firsthand the stress and anxiety of
                    finding suitable housing. As an international student from India, I had no connections, no
                    understanding of the neighborhoods, and limited resources. I ended up in an overpriced basement
                    apartment far from campus, spending hours commuting each day.
                  </p>

                  <p>
                    The turning point came in my second year when I was scammed out of my deposit by a fake landlord. I
                    lost $2,000—money my parents had worked hard to save. That experience was devastating, but it
                    sparked something in me. I realized thousands of students faced similar challenges every year, and
                    the system was failing them.
                  </p>

                  <p>
                    I began informally helping other international students find housing, creating a small network of
                    trusted landlords and roommate connections. What started as a spreadsheet and a WhatsApp group
                    evolved into Homi—a platform built by students, for students.
                  </p>

                  <p>
                    Our mission goes beyond just connecting students with housing. We're creating a community where
                    students can find their perfect living situation—one that supports their academic success, mental
                    wellbeing, and social growth. We verify every listing, use AI to match compatible roommates, and
                    provide resources to help students navigate the rental process safely.
                  </p>

                  <p>
                    The name "Homi" comes from the Hindi word "homī," meaning "belonging." That's what we want every
                    student to feel—a sense of belonging in their university home. When students have stable, safe
                    housing near campus, they can focus on what matters: their education and personal growth.
                  </p>

                  <p>
                    Today, we've helped over 3,500 students find housing across Ontario, but we're just getting started.
                    My vision is to expand Homi across Canada and eventually globally, transforming how students find
                    housing everywhere.
                  </p>

                  <p>
                    Every time I hear from a student who found their perfect apartment or ideal roommate through Homi,
                    I'm reminded of why this mission matters. Housing isn't just about four walls and a roof—it's about
                    creating the foundation for academic success and lifelong memories.
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <Button asChild className="bg-primary hover:bg-primary-600 text-white rounded-full">
                    <Link href="/quiz">
                      Find Your Housing Match
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/about">Learn More About Our Team</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Our Impact in Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">3,500+</div>
                  <div className="text-gray-600">Students Housed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">7</div>
                  <div className="text-gray-600">Ontario Universities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">$0</div>
                  <div className="text-gray-600">Cost to Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
