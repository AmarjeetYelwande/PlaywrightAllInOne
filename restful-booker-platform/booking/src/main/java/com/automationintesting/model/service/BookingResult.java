package com.automationintesting.model.service;

import com.automationintesting.model.db.AvailableRoom;
import com.automationintesting.model.db.Booking;
import com.automationintesting.model.db.Bookings;
import com.automationintesting.model.db.CreatedBooking;
import org.springframework.http.HttpStatus;

import java.util.List;

public class BookingResult {

    private Booking booking;

    private CreatedBooking createdBooking;

    private List<AvailableRoom> availableRooms;

    private Bookings bookings;

    private HttpStatus result;

    public BookingResult(Booking booking, HttpStatus result) {
        this.booking = booking;
        this.result = result;
    }

    public BookingResult(CreatedBooking createdBooking, HttpStatus result) {
        this.createdBooking = createdBooking;
        this.result = result;
    }

    public BookingResult(Bookings bookings, HttpStatus result){
        this.bookings = bookings;
        this.result= result;
    }

    public BookingResult(List<AvailableRoom> availableRooms, HttpStatus result) {
        this.availableRooms = availableRooms;
        this.result = result;
    }

    public BookingResult(HttpStatus result) {
        this.result = result;
    }

    public HttpStatus getStatus() {
        return result;
    }

    public Booking getBooking() {
        return booking;
    }

    public CreatedBooking getCreatedBooking() {
        return createdBooking;
    }

    public Bookings getBookings() {
        return bookings;
    }

    public List<AvailableRoom> getAvailableRooms() {
        return availableRooms;
    }
}
