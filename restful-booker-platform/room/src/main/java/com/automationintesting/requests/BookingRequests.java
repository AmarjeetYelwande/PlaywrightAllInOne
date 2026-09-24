package com.automationintesting.requests;

import com.automationintesting.model.request.UnavailableRoom;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class BookingRequests {

    private String host;

    public BookingRequests() {
        if(System.getenv("bookingDomain") == null){
            host = "http://localhost:3000";
        } else {
            host = "http://" + System.getenv("bookingDomain") + ":3000";
        }
    }

    public List<UnavailableRoom> getUnavailableRooms(String checkInDate, String checkOutDate) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> httpEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<List<UnavailableRoom>> response = restTemplate.exchange(
                host + "/booking/unavailable?checkin=" + checkInDate + "&checkout=" + checkOutDate,
                HttpMethod.GET,
                httpEntity,
                new ParameterizedTypeReference<List<UnavailableRoom>>() {}
        );

        return response.getBody();
    }

}
