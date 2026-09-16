using System.Text;
using Microsoft.Playwright;

namespace API.Automation;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ParameterisedTest
{
    [TestCase("3004","/auth", 200)]
    [TestCase("3002","/branding", 200)]
    [TestCase("3005", "/report", 200)]
    [TestCase("3006", "/message", 200)]
    [TestCase("3001", "/room", 200)]
    [TestCase("3000", "/booking", 200)]
    public async Task GetHealthStatusOfTheApp(string portNumber, string app, int status)
    { 
        var playwright = await Playwright.CreateAsync();
        var endpoint = new StringBuilder(app + "/actuator/health");
        var request = await playwright.APIRequest.NewContextAsync(new APIRequestNewContextOptions()
            {
                BaseURL = new StringBuilder("http://localhost:" + portNumber).ToString(),
                IgnoreHTTPSErrors = true
            }
        );
        var response = await request.GetAsync(endpoint.ToString());
        Assert.That(response.Status ,Is.EqualTo(status),"Status response should be 200");
        var responseText = await response.JsonAsync();
        Assert.That(responseText,!Is.EqualTo(null),"App response should not be empty");
    }
}

