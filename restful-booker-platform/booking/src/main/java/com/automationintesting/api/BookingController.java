package com.automationintesting.api;

import com.automationintesting.model.db.*;
import com.automationintesting.model.service.BookingResult;
import com.automationintesting.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<Bookings> getBookings(@RequestParam("roomid") Optional<String> roomid, @CookieValue(value ="token", required = false) String token) throws SQLException {
        BookingResult bookingResult = bookingService.getBookings(roomid, token);

        return ResponseEntity.status(bookingResult.getStatus()).body(bookingResult.getBookings());
    }

    @RequestMapping(value = "/unavailable", method = RequestMethod.GET)
    public ResponseEntity<List<AvailableRoom>> checkUnavailability(@RequestParam("checkin") String checkin, @RequestParam("checkout") String checkout) throws SQLException {
        BookingResult bookingResult = bookingService.checkUnavailability(LocalDate.parse(checkin), LocalDate.parse(checkout));

        return ResponseEntity.status(bookingResult.getStatus()).body(bookingResult.getAvailableRooms());
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<CreatedBooking> createBooking(@Valid @RequestBody Booking booking) throws SQLException {
        BookingResult bookingResult = bookingService.createBooking(booking);

        return ResponseEntity.status(bookingResult.getStatus()).body(bookingResult.getCreatedBooking());
    }

    @RequestMapping(value = "/{id:[0-9]*}", method = RequestMethod.GET)
    public ResponseEntity<Booking> getBooking(@PathVariable(value = "id") int bookingId, @CookieValue(value ="token", required = false) String token) throws SQLException {
        BookingResult bookingResult = bookingService.getIndividualBooking(bookingId, token);

        return ResponseEntity.status(bookingResult.getStatus()).body(bookingResult.getBooking());
    }

    @RequestMapping(value = "/{id:[0-9]*}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteBooking(@PathVariable(value = "id") int id, @CookieValue(value ="token", required = false) String token) throws SQLException {
        HttpStatus deleteHttpStatus = bookingService.deleteBooking(id, token);

        return ResponseEntity.status(deleteHttpStatus).build();
    }

    @RequestMapping(value = "/{id:[0-9]*}", method = RequestMethod.PUT)
    public ResponseEntity<CreatedBooking> updateBooking(@Valid @RequestBody Booking booking, @PathVariable(value = "id") int id, @CookieValue(value ="token", required = false) String token) throws SQLException {
        BookingResult updateResult = bookingService.updateBooking(id, booking, token);

        return ResponseEntity.status(updateResult.getStatus()).body(updateResult.getCreatedBooking());
    }

    @RequestMapping(value = "/summary", method = RequestMethod.GET)
    public ResponseEntity<BookingSummaries> getSummaries(@RequestParam("roomid") String roomid) throws SQLException {
        BookingSummaries bookingSummaries = bookingService.getBookingSummaries(roomid);

        return ResponseEntity.status(HttpStatus.OK).body(bookingSummaries);
    }

}
