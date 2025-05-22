"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Event types
type EventType = "housing" | "academic" | "social" | "reminder"

interface Event {
  id: number
  title: string
  date: Date
  type: EventType
  description?: string
  time?: string
  location?: string
}

// Sample events
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Housing Application Due",
    date: new Date(2023, 6, 15), // July 15, 2023
    type: "housing",
    description: "Submit housing application for fall semester",
    time: "11:59 PM",
  },
  {
    id: 2,
    title: "Campus Tour",
    date: new Date(2023, 6, 20), // July 20, 2023
    type: "housing",
    description: "Tour of potential housing options",
    time: "2:00 PM",
    location: "Student Center",
  },
  {
    id: 3,
    title: "Course Registration",
    date: new Date(2023, 6, 10), // July 10, 2023
    type: "academic",
    description: "Register for fall semester courses",
    time: "9:00 AM",
  },
  {
    id: 4,
    title: "Roommate Meetup",
    date: new Date(2023, 6, 25), // July 25, 2023
    type: "social",
    description: "Coffee with potential roommates",
    time: "3:30 PM",
    location: "Campus Coffee Shop",
  },
  {
    id: 5,
    title: "Rent Payment Due",
    date: new Date(2023, 7, 1), // August 1, 2023
    type: "reminder",
    description: "Monthly rent payment",
    time: "11:59 PM",
  },
]

// Helper functions
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

const getMonthName = (month: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return months[month]
}

export function CalendarView() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    type: "reminder",
    description: "",
    time: "",
    location: "",
  })
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Add a new event
  const addEvent = () => {
    if (!selectedDate || !newEvent.title) return

    const event: Event = {
      id: events.length + 1,
      title: newEvent.title || "",
      date: selectedDate,
      type: (newEvent.type as EventType) || "reminder",
      description: newEvent.description,
      time: newEvent.time,
      location: newEvent.location,
    }

    setEvents([...events, event])
    setIsAddEventOpen(false)
    resetNewEvent()
  }

  // Reset new event form
  const resetNewEvent = () => {
    setNewEvent({
      title: "",
      type: "reminder",
      description: "",
      time: "",
      location: "",
    })
  }

  // Delete an event
  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
    setIsViewEventOpen(false)
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Render calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 p-1"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isToday =
        today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
      const dayEvents = getEventsForDate(date)

      days.push(
        <div
          key={`day-${day}`}
          className={`h-24 border border-gray-200 p-1 ${isToday ? "bg-blue-50" : ""} hover:bg-gray-50 cursor-pointer`}
          onClick={() => {
            setSelectedDate(date)
            setIsAddEventOpen(true)
          }}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? "text-blue-600" : ""}`}>{day}</span>
            {dayEvents.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {dayEvents.length}
              </Badge>
            )}
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${
                  event.type === "housing"
                    ? "bg-green-100 text-green-800"
                    : event.type === "academic"
                      ? "bg-blue-100 text-blue-800"
                      : event.type === "social"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedEvent(event)
                  setIsViewEventOpen(true)
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Calendar</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {getMonthName(currentMonth)} {currentYear}
              </span>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>Manage your housing, academic, and social events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-0">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Housing</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Academic</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs">Social</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Reminder</span>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setSelectedDate(new Date())
              setIsAddEventOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Event
          </Button>
        </CardFooter>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              {selectedDate && <span>Create an event for {selectedDate.toLocaleDateString()}</span>}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) => setNewEvent({ ...newEvent, type: value as EventType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time (Optional)</Label>
              <Input
                id="time"
                placeholder="e.g., 3:00 PM"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddEventOpen(false)
                resetNewEvent()
              }}
            >
              Cancel
            </Button>
            <Button onClick={addEvent} disabled={!newEvent.title}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>{selectedEvent?.date.toLocaleDateString()}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center space-x-2">
              <Badge
                className={
                  selectedEvent?.type === "housing"
                    ? "bg-green-100 text-green-800"
                    : selectedEvent?.type === "academic"
                      ? "bg-blue-100 text-blue-800"
                      : selectedEvent?.type === "social"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                }
              >
                {selectedEvent?.type}
              </Badge>
              {selectedEvent?.time && <span className="text-sm text-gray-500">{selectedEvent.time}</span>}
            </div>

            {selectedEvent?.location && (
              <div className="space-y-1">
                <Label className="text-sm">Location</Label>
                <p className="text-sm">{selectedEvent.location}</p>
              </div>
            )}

            {selectedEvent?.description && (
              <div className="space-y-1">
                <Label className="text-sm">Description</Label>
                <p className="text-sm">{selectedEvent.description}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="destructive" onClick={() => selectedEvent && deleteEvent(selectedEvent.id)}>
              Delete Event
            </Button>
            <Button onClick={() => setIsViewEventOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
