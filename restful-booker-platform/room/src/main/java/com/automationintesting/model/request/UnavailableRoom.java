package com.automationintesting.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UnavailableRoom {

    @JsonProperty
    private int roomid;

    public UnavailableRoom(int roomid) {
        this.roomid = roomid;
    }

    public int getRoomid() {
        return roomid;
    }

    public void setRoomid(int roomid) {
        this.roomid = roomid;
    }

    public UnavailableRoom() {
    }

    @Override
    public String toString() {
        return "AvailableRoom{" +
                "roomid=" + roomid +
                '}';
    }

}
