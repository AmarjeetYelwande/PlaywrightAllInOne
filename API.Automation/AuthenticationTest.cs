using System.Collections;
using System.Text.Json;
using Microsoft.ApplicationInsights;
using Microsoft.Playwright;
using RandomDataGenerator.FieldOptions;
using RandomDataGenerator.Randomizers;

namespace API.Automation;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class AuthenticationTest
{
    private string? _authenticationToken = "";

    private async Task GetAuthenticationToken()
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
        _authenticationToken = root
            .GetProperty("user")
            .GetProperty("token")
            .GetString();
    }
    
    [Test]
    public async Task WriteArticle()
    {
        await GetAuthenticationToken();
        var playwright = await Playwright.CreateAsync();

        var headers = new Dictionary<string, string>
        {
            { "Content-Type", "application/json" },
            { "Authorization", "Bearer " + _authenticationToken }
        };
        
        var randomizerFullName = RandomizerFactory.GetRandomizer(new FieldOptionsFullName());
        var fullName = randomizerFullName.Generate();

        var randomNumber = RandomizerFactory.GetRandomizer(new FieldOptionsInteger());
        var articleNumber = randomNumber.Generate();

        var randomTimeStamp = RandomizerFactory.GetRandomizer(new FieldOptionsDateTime());
        var date = randomTimeStamp.Generate();
        
        var payload = new
        {
            article = new
            {
                title =  "Article number " + articleNumber,
                description = "Written by " + fullName,
                body = "Submitted time " + date,
                tagList = new ArrayList{"Test"}
            }
        };
        
        var request = await playwright.APIRequest.NewContextAsync(new APIRequestNewContextOptions()
            {
                BaseURL = "https://conduit-api.bondaracademy.com",
                IgnoreHTTPSErrors = true
            }
        );
        var response = await request.PostAsync("/api/articles/", new APIRequestContextOptions()
        {
            DataObject= payload,
            Headers = headers
        });
        
        Assert.That(response.Status ,Is.EqualTo(201),"Status response should be 201");
        JsonElement root = (await response.JsonAsync())!.Value;
        var isFavourited = root
            .GetProperty("article")
            .GetProperty("favorited")
            .GetBoolean();
        Assert.That(isFavourited, Is.False);

        var imageUrl = root
            .GetProperty("article")
            .GetProperty("author")
            .GetProperty("image")
            .ToString();
        
        Assert.That(imageUrl, Is.EqualTo("https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg"));
    }
}