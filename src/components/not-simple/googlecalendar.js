'use client'
import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import plLocale from "@fullcalendar/core/locales/pl";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import useWindowSize from "@/hooks/use-window-size";

export default function GoogleCalendar(props){
  const size = useWindowSize();

  return (
    <div className="mx-auto">
      {
      size.width < 1024 ?
      <div className="h-[460px]">
        <div className="w-full h-full !text-[10px] md:!text-md">
          <FullCalendar
              locale={plLocale}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
              headerToolbar={{
                left: '',
                center: 'title',
                right: ''
              }}
              footerToolbar={{
                left: 'prev,next,today',
                right: 'timeGridDay,timeGridWeek'
              }}
              height={'100%'}
              initialView="timeGridDay"
              handleWindowResize={false}
              googleCalendarApiKey={props.apiKey}
              events={{ googleCalendarId: props.calendar}}
          />
        </div>
      </div>
      :
      <div className="">
        <FullCalendar
            locale={plLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
            headerToolbar={{
              left: 'prev,next,today',
              center: 'title',
              right: 'timeGridDay,timeGridWeek'
            }}
            initialView="timeGridWeek"
            googleCalendarApiKey={props.apiKey}
            events={{ googleCalendarId: props.calendar}}
        />
      </div>
      }
    </div>
    );
};