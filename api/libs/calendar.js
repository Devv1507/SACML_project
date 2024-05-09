
const { Calendar } = require('@fullcalendar/core');
const dayGridPlugin = require('@fullcalendar/daygrid');

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth', // Vista inicial del calendario
        events: [
            // Aquí puedes definir los eventos de la agenda
            {
                title: 'Evento 1',
                start: '2022-05-10'
            },
            {
                title: 'Evento 2',
                start: '2022-05-15',
                end: '2022-05-17'
            }
            // Agrega más eventos según sea necesario
        ]
    });
    calendar.render();
});
