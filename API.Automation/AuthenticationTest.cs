using System.Text.Json;
using Microsoft.ApplicationInsights;
using Microsoft.Playwright;

namespace API.Automation;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class AuthenticationTest
{
    [Test]
    public static async Task GetAuthenticationToken()
    {
        var playwright = await Playwright.CreateAsync();

        var headers = new Dictionary<string, string>
        {
            { "Content-Type", "application/json" }
        };
        const string json = """
                                { 
                                "user": { "email": "test@nai.com", "password": "12345678"}
                                }
                            """;
        var request = await playwright.APIRequest.NewContextAsync(new APIRequestNewContextOptions()
            {
                BaseURL = "https://conduit-api.bondaracademy.com",
                IgnoreHTTPSErrors = true
            }
        );
        var response = await request.PostAsync("/api/users/login", new APIRequestContextOptions()
        {
            Data = json,
            Headers = headers
        });
        Assert.That(response.Status, Is.EqualTo(200), "Status response should be 200");
        JsonElement root = (await response.JsonAsync())!.Value;
        var token = root
            .GetProperty("user")
            .GetProperty("token")
            .GetString();
        Console.WriteLine("value of the token is : " + token);
    }
}