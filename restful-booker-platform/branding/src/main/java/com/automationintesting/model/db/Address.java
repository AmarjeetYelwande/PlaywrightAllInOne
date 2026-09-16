package com.automationintesting.model.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Address {

    @JsonProperty
    @NotNull(message = "Line1 should not be null")
    @NotBlank(message = "Line1 should not be blank")
    private String line1;

    @JsonProperty
    @NotNull(message = "Line2 should not be null")
    @NotBlank(message = "Line2 should not be blank")
    private String line2;

    @JsonProperty
    @NotNull(message = "Post town should not be null")
    @NotBlank(message = "Post town should not be blank")
    private String postTown;

    @JsonProperty
    @NotNull(message = "County should not be null")
    @NotBlank(message = "County should not be blank")
    private String county;

    @JsonProperty
    @NotNull(message = "Post code should not be null")
    @NotBlank(message = "Post code should not be blank")
    private String postCode;

    public Address() {}

    public Address(String line1, String line2, String postTown, String county, String postCode) {
        this.line1 = line1;
        this.line2 = line2;
        this.postTown = postTown;
        this.county = county;
        this.postCode = postCode;
    }

    public Address(ResultSet result) throws SQLException {
        this.line1 = result.getString("line1");
        this.line2 = result.getString("line2");
        this.postTown = result.getString("post_town");
        this.county = result.getString("county");
        this.postCode = result.getString("post_code");
    }

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getPostTown() {
        return postTown;
    }

    public void setPostTown(String postTown) {
        this.postTown = postTown;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Override
    public String toString() {
        return "Address{" +
                "line1='" + line1 + '\'' +
                ", line2='" + line2 + '\'' +
                ", postTown='" + postTown + '\'' +
                ", county='" + county + '\'' +
                ", postCode='" + postCode + '\'' +
                '}';
    }
}
