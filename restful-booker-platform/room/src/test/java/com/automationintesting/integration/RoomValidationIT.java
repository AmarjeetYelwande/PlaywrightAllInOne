package com.automationintesting.integration;

import com.automationintesting.api.RoomApplication;
import com.automationintesting.model.db.Room;
import com.automationintesting.model.db.Rooms;
import com.xebialabs.restito.server.StubServer;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.xebialabs.restito.builder.stub.StubHttp.whenHttp;
import static com.xebialabs.restito.semantics.Action.*;
import static com.xebialabs.restito.semantics.Condition.*;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT, classes = RoomApplication.class)
@ActiveProfiles("dev")
public class RoomValidationIT {

    private final StubServer bookingApi = new StubServer(3000).run();

    @BeforeEach
    public void setupRestito() {
        whenHttp(bookingApi).
                match(get("/booking/unavailable")).
                then(ok(),  header("Content-Type","application/json"), stringContent("[{\"roomid\":1}]"));
    }

    @AfterEach
    public void stopServer() throws InterruptedException {
        bookingApi.stop();

        // Mocking is too slow to kill APIs so we have to pause the run to let it catchup
        Thread.sleep(1500);
    }

    @Test
    public void testPostValidation() {
        Room roomPayload = new Room.RoomBuilder().build();

        Response response = given()
            .contentType(ContentType.JSON)
            .body(roomPayload)
            .when()
            .post("http://localhost:3001/room/");

        assertEquals(400, response.statusCode());
    }

    @Test
    public void testPutValidation() {
        Room roomPayload = new Room.RoomBuilder()
                                      .build();

        Response response = given()
                .contentType(ContentType.JSON)
                .body(roomPayload)
                .when()
                .put("http://localhost:3001/room/1");

        assertEquals(400, response.statusCode());
    }

    @Test
    public void testGetRooms() {
        Response response = given()
                .contentType(ContentType.JSON)
                .when()
                .get("http://localhost:3001/room/");

        assertEquals(200, response.statusCode());
        assertEquals(response.body().as(Rooms.class).getRooms().size(), 3);
    }

    @Test
    public void testRoomAvailability() {
        Response response = given()
                .contentType(ContentType.JSON)
                .when()
                .get("http://localhost:3001/room/?checkin=2023-10-01&checkout=2023-10-02");

        assertEquals(200, response.statusCode());
        assertEquals(2, response.body().as(Rooms.class).getRooms().size());
    }

}
