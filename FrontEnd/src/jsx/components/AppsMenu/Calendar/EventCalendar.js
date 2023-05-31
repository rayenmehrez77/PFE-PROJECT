import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import axios from "axios";

class EventCalendar extends Component {
  state = {
    calendarEvents: [],
    change: false,
  };
  render() {
    return (
      <div className="animated fadeIn demo-app">
        <h1 className="fw-bold text-center mb-3">
          Les événements Zonal pour l'année 2023
        </h1>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <div className="demo-app-calendar" id="mycalendartest">
                  <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    rerenderDelay={10}
                    eventDurationEditable={false}
                    editable={true}
                    droppable={true}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={this.calendarComponentRef}
                    weekends={this.state.calendarWeekends}
                    events={this.state.calendarEvents}
                    eventDrop={this.drop}
                    eventReceive={this.eventReceive}
                    eventClick={this.eventClick}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventCalendar;
