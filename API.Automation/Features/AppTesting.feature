Feature: Book Registration System
As an Author,
I want create my book entry
So that all of my readers know that I have added the book on my website

Scenario: Book is successfully added on my website
    Given I send request to get token for my next API call
    Then I am able to get the token which I am going to save in an environment variable
    When I send request to my website to add my book with 'Title' 'Body' 'Description' and 'Taglist'
        | Title          | Body               | Description | Taglist  |
        | My First Book  | Submitted Time     | Written By  |  Fiction |
    Then I am able to see that it is successfully added to the website


