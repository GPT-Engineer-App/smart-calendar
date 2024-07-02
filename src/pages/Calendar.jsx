import React, { useState } from "react";
import { Calendar as ReactCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea } from "@chakra-ui/react";
import { toast } from "sonner";

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
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState("");

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalOpen(true);
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setModalOpen(false);
    toast.success("Event added successfully!");
  };

  const handleCalculatorInput = (value) => {
    setCalculatorInput(calculatorInput + value);
  };

  const handleCalculatorClear = () => {
    setCalculatorInput("");
  };

  const handleCalculatorEvaluate = () => {
    try {
      setCalculatorInput(eval(calculatorInput).toString());
    } catch {
      setCalculatorInput("Error");
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color || "#3174ad";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
      fontSize: "16px",
      fontWeight: "bold",
    };
    return {
      style,
    };
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
        eventPropGetter={eventStyleGetter}
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
      <Button onClick={() => setCalculatorOpen(!calculatorOpen)} className="fixed bottom-4 right-4">
        {calculatorOpen ? "Close Calculator" : "Open Calculator"}
      </Button>
      {calculatorOpen && (
        <div className="fixed bottom-16 right-4 bg-white p-4 rounded shadow-lg">
          <div className="grid grid-cols-4 gap-2">
            <Input value={calculatorInput} readOnly className="col-span-4 mb-2" />
            {["7", "8", "9", "/"].map((value) => (
              <Button key={value} onClick={() => handleCalculatorInput(value)}>{value}</Button>
            ))}
            {["4", "5", "6", "*"].map((value) => (
              <Button key={value} onClick={() => handleCalculatorInput(value)}>{value}</Button>
            ))}
            {["1", "2", "3", "-"].map((value) => (
              <Button key={value} onClick={() => handleCalculatorInput(value)}>{value}</Button>
            ))}
            {["0", ".", "=", "+"].map((value) => (
              <Button key={value} onClick={() => value === "=" ? handleCalculatorEvaluate() : handleCalculatorInput(value)}>{value}</Button>
            ))}
            <Button className="col-span-4" onClick={handleCalculatorClear}>Clear</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;