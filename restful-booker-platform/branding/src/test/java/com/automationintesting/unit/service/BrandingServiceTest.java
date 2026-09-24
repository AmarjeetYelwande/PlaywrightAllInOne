package com.automationintesting.unit.service;

import com.automationintesting.db.BrandingDB;
import com.automationintesting.model.db.Address;
import com.automationintesting.model.db.Branding;
import com.automationintesting.model.db.Contact;
import com.automationintesting.model.db.Map;
import com.automationintesting.model.service.BrandingResult;
import com.automationintesting.requests.AuthRequests;
import com.automationintesting.service.BrandingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class BrandingServiceTest {

    @Mock
    private BrandingDB brandingDB;

    @Mock
    private AuthRequests authRequests;

    @InjectMocks
    @Autowired
    private BrandingService brandingService;

    @BeforeEach
    public void initialiseMocks() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void queryBrandingTest() throws SQLException {
        Map sampleMap = new Map(2.00,4.00);
        Contact sampleContact = new Contact("Demo B&B contact name", "012345", "test@email.com");
        Address sampleAddress = new Address("The street", "The street 2", "The town", "The county", "The post code");
        Branding sampleBranding = new Branding("Demo B&B", sampleMap, "directions", "http://sample.url", "Branding description here", sampleContact, sampleAddress);

        when(brandingDB.queryBranding()).thenReturn(sampleBranding);

        Branding branding = brandingService.getBrandingDetails();
        assertEquals("Branding{name='Demo B&B', map=Map{latitude=2.0, longitude=4.0}, logoUrl='http://sample.url', description='Branding description here', directions='directions', contact=Contact{name='Demo B&B contact name', phone='012345', email='test@email.com'}, address=Address{line1='The street', line2='The street 2', postTown='The town', county='The county', postCode='The post code'}}", branding.toString());
    }

    @Test
    public void updateBrandingTest() throws SQLException {
        String token = "abc";

        Map sampleMap = new Map(2.00,4.00);
        Contact sampleContact = new Contact("Demo B&B contact name", "012345", "test@email.com");
        Address sampleAddress = new Address("The street", "The street 2", "The town", "The county", "The post code");
        Branding sampleBranding = new Branding("Updated Branding", sampleMap, "directions", "http://sample.url", "Branding description here", sampleContact, sampleAddress);

        when(brandingDB.update(sampleBranding)).thenReturn(sampleBranding);
        when(authRequests.postCheckAuth("abc")).thenReturn(true);

        BrandingResult result = brandingService.updateBrandingDetails(sampleBranding, token);

        assertEquals(HttpStatus.ACCEPTED, result.getHttpStatus());
        assertEquals("Branding{name='Updated Branding', map=Map{latitude=2.0, longitude=4.0}, logoUrl='http://sample.url', description='Branding description here', directions='directions', contact=Contact{name='Demo B&B contact name', phone='012345', email='test@email.com'}, address=Address{line1='The street', line2='The street 2', postTown='The town', county='The county', postCode='The post code'}}", result.getBranding().toString());
    }

    @Test
    public void updateBrandingFailedTest() throws SQLException {
        String token = "abc";

        when(authRequests.postCheckAuth(token)).thenReturn(false);

        BrandingResult result = brandingService.updateBrandingDetails(null, token);

        assertEquals(HttpStatus.FORBIDDEN, result.getHttpStatus());
    }

}
