"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Set up the localizer for the calendar
const localizer = momentLocalizer(moment)

// Sample event types with colors
const EVENT_TYPES = {
  viewing: { color: "#4f46e5", label: "Property Viewing" },
  maintenance: { color: "#f59e0b", label: "Maintenance" },
  lease: { color: "#10b981", label: "Lease Signing" },
  payment: { color: "#ef4444", label: "Payment Due" },
  other: { color: "#6b7280", label: "Other" },
}

// Sample events
const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Property Viewing - 123 College St",
    start: moment().add(1, "days").set({ hour: 10, minute: 0 }).toDate(),
    end: moment().add(1, "days").set({ hour: 11, minute: 0 }).toDate(),
    type: "viewing",
    propertyId: "prop123",
    notes: "Student from UofT, interested in 1-bedroom unit",
  },
  {
    id: 2,
    title: "Maintenance - 456 University Ave",
    start: moment().add(2, "days").set({ hour: 13, minute: 0 }).toDate(),
    end: moment().add(2, "days").set({ hour: 15, minute: 0 }).toDate(),
    type: "maintenance",
    propertyId: "prop456",
    notes: "Fix leaking faucet in unit 3B",
  },
  {
    id: 3,
    title: "Lease Signing - 789 Campus Dr",
    start: moment().set({ hour: 15, minute: 0 }).toDate(),
    end: moment().set({ hour: 16, minute: 0 }).toDate(),
    type: "lease",
    propertyId: "prop789",
    notes: "Group of 4 students signing 12-month lease",
  },
  {
    id: 4,
    title: "Rent Collection Due",
    start: moment().date(1).toDate(),
    end: moment().date(1).toDate(),
    type: "payment",
    allDay: true,
    notes: "Monthly rent collection for all properties",
  },
]

// Sample properties
const PROPERTIES = [
  { id: "prop123", name: "123 College St" },
  { id: "prop456", name: "456 University Ave" },
  { id: "prop789", name: "789 Campus Dr" },
  { id: "prop101", name: "101 Dorm Lane" },
]

export function LandlordCalendar() {
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    type: "viewing",
    propertyId: "",
    notes: "",
  })
  const [activeTab, setActiveTab] = useState("calendar")

  // Event style getter for the calendar
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: EVENT_TYPES[event.type]?.color || EVENT_TYPES.other.color,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    }
    return { style }
  }

  // Handle event selection
  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
  }

  // Handle adding a new event
  const handleAddEvent = () => {
    const id = events.length + 1
    setEvents([...events, { ...newEvent, id }])
    setIsAddingEvent(false)
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      type: "viewing",
      propertyId: "",
      notes: "",
    })
  }

  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id))
    setSelectedEvent(null)
  }

  // Upcoming events section
  const upcomingEvents = events
    .filter((event) => moment(event.start).isAfter(moment()))
    .sort((a, b) => moment(a.start).diff(moment(b.start)))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Property Management Calendar</h2>
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
              <DialogTrigger asChild>
                <Button>Add Event</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Create a new calendar event for your properties.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="event-title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-type" className="text-right">
                      Type
                    </Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(EVENT_TYPES).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-property" className="text-right">
                      Property
                    </Label>
                    <Select
                      value={newEvent.propertyId}
                      onValueChange={(value) => setNewEvent({ ...newEvent, propertyId: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTIES.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-start" className="text-right">
                      Start
                    </Label>
                    <Input
                      id="event-start"
                      type="datetime-local"
                      value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                      onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-end" className="text-right">
                      End
                    </Label>
                    <Input
                      id="event-end"
                      type="datetime-local"
                      value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                      onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-notes" className="text-right">
                      Notes
                    </Label>
                    <Input
                      id="event-notes"
                      value={newEvent.notes}
                      onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddEvent}>
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="h-[600px] bg-white rounded-md shadow">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%", padding: "20px" }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
            />
          </div>

          {selectedEvent && (
            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedEvent.title}</DialogTitle>
                  <DialogDescription>
                    {moment(selectedEvent.start).format("MMMM D, YYYY")} •{" "}
                    {moment(selectedEvent.start).format("h:mm A")} - {moment(selectedEvent.end).format("h:mm A")}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: EVENT_TYPES[selectedEvent.type]?.color }}
                    />
                    <span>{EVENT_TYPES[selectedEvent.type]?.label}</span>
                  </div>
                  {selectedEvent.propertyId && (
                    <p className="text-sm text-gray-500 mb-2">
                      Property: {PROPERTIES.find((p) => p.id === selectedEvent.propertyId)?.name || "Unknown"}
                    </p>
                  )}
                  {selectedEvent.notes && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Notes:</h4>
                      <p className="text-sm text-gray-600">{selectedEvent.notes}</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                    Delete Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectEvent(event)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>
                          {moment(event.start).format("MMMM D, YYYY")} • {moment(event.start).format("h:mm A")} -{" "}
                          {moment(event.end).format("h:mm A")}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: EVENT_TYPES[event.type]?.color }}
                        />
                        <span className="text-sm">{EVENT_TYPES[event.type]?.label}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {event.propertyId && (
                      <p className="text-sm text-gray-500">
                        Property: {PROPERTIES.find((p) => p.id === event.propertyId)?.name || "Unknown"}
                      </p>
                    )}
                    {event.notes && <p className="text-sm mt-1">{event.notes}</p>}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No upcoming events</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
