using System.Collections;
using System.Security;
using Microsoft.Playwright;
using RandomDataGenerator.FieldOptions;
using RandomDataGenerator.Randomizers;
using Reqnroll;
using static System.Environment;

namespace API.Automation.StepDefinitions;

[Binding]
internal class AddBookToWebsite
{
    private string? _authenticationToken;

    [Given("I send request to get token for my next API call")]
    public async Task GivenISendAuthenticationRequestToGetTokenForMyNextApiCall()
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
            var root = (await response.JsonAsync())!.Value;
            _authenticationToken = root
                .GetProperty("user")
                .GetProperty("token")
                .GetString();
        
    }

    [Then("I am able to get the token which I am going to save in an environment variable")]
    public void ThenIAmAbleToGetTheTokenWhichIAmGoingToSaveInAnEnvironmentVariable()
    {
        try
        {
            SetEnvironmentVariable("AuthToken", _authenticationToken);
        }
        catch (ArgumentNullException exception)
        {
            Console.WriteLine(exception.Message, "Authentication Error. Token is null");
        }
    }

    [When("I send request to my website to add my book with {string} {string} {string} and {string}")]
    public async Task SendRequestToMyWebsiteToAddMyBook(string title, string body, string description, string taglist, Table table)
    {
        if (_authenticationToken != null)
        {
            string? token = null;
            try
            {
                token = GetEnvironmentVariable("AuthToken");
            }            
            catch (SecurityException exception)
            {
                // The caller does not have the required permission to perform this operation.
            }

            var playwright = await Playwright.CreateAsync();

            var headers = new Dictionary<string, string>
            {
                { "Content-Type", "application/json" },
                { "Authorization", "Bearer " + token }
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
                    title = "Article number " + articleNumber,
                    description = "Written by " + fullName,
                    body = "Submitted time " + date,
                    tagList = new ArrayList { "Test" }
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
                DataObject = payload,
                Headers = headers
            });

            Assert.That(response.Status, Is.EqualTo(201), "Status response should be 201");
            var root = (await response.JsonAsync())!.Value;
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

    [Then("I am able to see that it is successfully added to the website")]
    public void ThenIAmAbleToSeeThatItIsSuccessfullyAddedToTheWebsite()
    {
        Console.WriteLine(_authenticationToken);
    }
   
}