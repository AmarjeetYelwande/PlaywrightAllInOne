using System.Threading.Tasks;
using Microsoft.Playwright;
using Reqnroll;

namespace UI.Automation.Hooks
{
    [Binding]
    public class Hooks
    {
        public IPage User { get; private set; } = null!; 

        [BeforeScenario] 
        public async Task RegisterSingleInstancePractitioner()
        {
            IPlaywright playwright = await Playwright.CreateAsync();
            IBrowser browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
            {
                Headless = false 
            });
            IBrowserContext context1 = await browser.NewContextAsync();
            User = await context1.NewPageAsync(); 
        }
    }
}