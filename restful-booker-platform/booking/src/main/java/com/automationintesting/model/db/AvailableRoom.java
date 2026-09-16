package com.automationintesting.model.db;

public class AvailableRoom {

    private int roomid;

    public AvailableRoom(int roomid) {
        this.roomid = roomid;
    }

    public int getRoomid() {
        return roomid;
    }

    public void setRoomid(int roomid) {
        this.roomid = roomid;
    }

    @Override
    public String toString() {
        return "AvailableRoom{" +
                "roomid=" + roomid +
                '}';
    }
}
