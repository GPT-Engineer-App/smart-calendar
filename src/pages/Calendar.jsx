import React, { useState } from "react";
import { Calendar as ReactCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea } from "@chakra-ui/react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", description: "" });

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalOpen(true);
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setModalOpen(false);
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/sea-background.jpg')" }}>
      <ReactCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh", margin: "50px" }}
        selectable
        onSelectSlot={handleSelectSlot}
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              mb={3}
            />
            <Textarea
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              mb={3}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CalendarPage;