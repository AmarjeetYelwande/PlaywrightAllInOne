package com.automationintesting.model.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.URL;

import jakarta.persistence.Entity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.sql.ResultSet;
import java.sql.SQLException;

@Entity
public class Branding {

    @JsonProperty
    @NotNull(message = "Name should not be null")
    @NotBlank(message = "Name should not be blank")
    @Size(min = 3, max = 100)
    @Pattern(regexp = "[A-Za-z& ]*", message = "Name can only contain alpha characters and the & sign")
    private String name;

    @JsonProperty
    @Valid
    private Map map;

    @JsonProperty
    @NotNull(message = "Url should not be null")
    @NotBlank(message = "Url should not be blank")
    @URL(message = "Url should be a correct url format")
    private String logoUrl;

    @JsonProperty
    @NotNull(message = "Description should not be null")
    @NotBlank(message = "Description should not be blank")
    @Pattern(regexp = "[a-zA-Z,&. ]*", message = "Description can only contain alpha characters and basic grammar")
    @Size(min = 3, max = 500)
    private String description;

    @JsonProperty
    @NotNull(message = "Name should not be null")
    @NotBlank(message = "Name should not be blank")
    private String directions;

    @JsonProperty
    @Valid
    private Contact contact;

    @JsonProperty
    @Valid
    private Address address;

    public Branding() {}

    public Branding(String name, Map map, String directions, String logoUrl, String description, Contact contact, Address address) {
        this.name = name;
        this.map = map;
        this.directions = directions;
        this.logoUrl = logoUrl;
        this.description = description;
        this.contact = contact;
        this.address = address;
    }

    public Branding(ResultSet result) throws SQLException {
        this.name = result.getString("name");
        this.map = new Map(result);
        this.logoUrl = result.getString("logo_url");
        this.description = result.getString("description");
        this.directions = result.getString("directions");
        this.contact = new Contact(result);
        this.address = new Address(result);
    }

    public String getName() {
        return name;
    }

    public Map getMap() {
        return map;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public String getDirections() {
        return directions;
    }

    public String getDescription() {
        return description;
    }

    public Contact getContact() {
        return contact;
    }

    public Address getAddress() {
        return address;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMap(Map map) {
        this.map = map;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Branding{" +
                "name='" + name + '\'' +
                ", map=" + map.toString() +
                ", logoUrl='" + logoUrl + '\'' +
                ", description='" + description + '\'' +
                ", directions='" + directions + '\'' +
                ", contact=" + contact.toString() +
                ", address=" + address.toString() +
                '}';
    }

    public static class BrandingBuilder {
        private String name;
        private Map map;
        private String logoUrl;
        private String description;
        private String directions;
        private Contact contact;
        private Address address;

        public BrandingBuilder setName(String name) {
            this.name = name;

            return this;
        }

        public BrandingBuilder setMap(Map map) {
            this.map = map;

            return this;
        }

        public BrandingBuilder setLogoUrl(String logoUrl) {
            this.logoUrl = logoUrl;

            return this;
        }

        public BrandingBuilder setDirections(String directions) {
            this.directions = directions;

            return this;
        }

        public BrandingBuilder setDescription(String description) {
            this.description = description;

            return this;
        }

        public BrandingBuilder setContact(Contact contact) {
            this.contact = contact;

            return this;
        }

        public BrandingBuilder setAddress(Address address) {
            this.address = address;

            return this;
        }

        public Branding build(){
            return new Branding(name, map, logoUrl, directions, description, contact, address);
        }
    }
}
