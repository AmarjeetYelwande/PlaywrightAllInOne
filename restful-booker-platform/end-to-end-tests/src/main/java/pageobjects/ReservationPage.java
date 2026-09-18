package pageobjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class ReservationPage extends BasePage {

    @FindBy(how = How.CSS, using = "#doReservation")
    private WebElement btnOpenBooking;

    public ReservationPage(WebDriver driver) {
        super(driver);
    }

    public Boolean bookingFormExists() {
        return btnOpenBooking.isDisplayed();
    }

}
