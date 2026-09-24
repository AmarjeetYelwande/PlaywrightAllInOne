package com.automationintesting.db;

import com.automationintesting.model.db.Branding;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertSql {

    private PreparedStatement preparedStatement;

    InsertSql(Connection connection, Branding branding) throws SQLException {
        final String CREATE_BRANDING = "INSERT INTO PUBLIC.brandings (name, latitude, longitude, directions, logo_url, description, contact_name, phone, email, line1, line2, post_town, county, post_code) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        preparedStatement = connection.prepareStatement(CREATE_BRANDING);
        preparedStatement.setString(1, branding.getName());
        preparedStatement.setDouble(2, branding.getMap().getLatitude());
        preparedStatement.setDouble(3, branding.getMap().getLongitude());
        preparedStatement.setString(4, branding.getDirections());
        preparedStatement.setString(5, branding.getLogoUrl());
        preparedStatement.setString(6, branding.getDescription());
        preparedStatement.setString(7, branding.getContact().getName());
        preparedStatement.setString(8, branding.getContact().getPhone());
        preparedStatement.setString(9, branding.getContact().getEmail());
        preparedStatement.setString(10, branding.getAddress().getLine1());
        preparedStatement.setString(11, branding.getAddress().getLine2());
        preparedStatement.setString(12, branding.getAddress().getPostTown());
        preparedStatement.setString(13, branding.getAddress().getCounty());
        preparedStatement.setString(14, branding.getAddress().getPostCode());
    }

    public PreparedStatement getPreparedStatement() {
        return preparedStatement;
    }
}
