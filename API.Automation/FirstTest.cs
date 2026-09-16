using Microsoft.Playwright;

namespace API.Automation;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class FirstTest
{
    [Test]
    public async Task TestMethod()
    { 
        var playwright = await Playwright.CreateAsync();

        var request = await playwright.APIRequest.NewContextAsync(new APIRequestNewContextOptions()
            {
                BaseURL = "http://localhost:3000",
                IgnoreHTTPSErrors = true
            }
        );
        
        var response = await request.GetAsync("/booking/actuator/health");
        Console.WriteLine(response);
    }
}

