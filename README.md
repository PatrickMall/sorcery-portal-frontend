# Sorcery Portal

## About this project

Hello! I'm Patrick and I created this project to help support my partners branding, and web design business.

I built this application using Ruby-on-Rails for the back-end and React for the front-end as part of the software immersive course I am studying with General Assembly.

The project was my final build and was a solo project that needed to be completed in 9 days.

[Here is a link to the deployed application](https://portal.sorcery.design/)

## Aim

To build a user portal space that can be used by clients of Sorcery Design to upload their answers to Sorcery Design's question for fact finding to work on branding and marketing for the client.

### Who is the client

#### Sorcery Design

We're a design agency that specialises in enabling ethical entrepreneurs and organisations who make a difference to thrive in the digital realm. Because, what really matters to us is having a meaningful impact in meaningful work.
We get it: choosing the right creative partner to help you take your life's work to the next level is a challenge. But, with our combined 22 years of experience in branding, design, digital marketing, building websites and generating engaged advocates - we can help you craft the business of your dreams.

## The Plan

Through talking with the client we have decided that sorcery design needs a user space where clients of sorcery design, once signed up to working with them can then work through a series of questions and information gathering which sorcery design can then use to make and design the clients new identity system and website.
This will consist of a sign in portal which the user can sign up to and questions, and if I have enough time, an image upload facility for creating a mood board space . Once the client has finished the questions, the answers will be stored into sorcery design's database (rails) and the user will receive a confirmation email to say they have been received (stretch goal), and Sorcery design will be emailed the responses from the client (stretch goal).

## User Stories

- As a user I want to be able to create an account/profile on sorcery portal
- As a user I want to be able to delete my profile
- As a user I want to be able to edit my profile information
- As a user I want to be able to answer the questions and information gathering
- As a user I want to be able to edit the answers and information gathering
- As a user I want to be able to view the answers to questions and information gathering
- As a user I want to be able to delete the answers and information gathering
- As a user I want to be able to send sorcery design my answers so they can create my logo/identity system
- User Stories (stretch goals)
- As a user I want to be able to upload pictures to my mood board in the portal
- As a user I want to be able to send the mood board to sorcery design
- As a user I want to be able to add colours I like to a palette for sorcery design to use in my new logo/identity system
- As a user I want to receive a confirmation email that my information has been sent to sorcery design.
  Entity Relationship Diagram

## Basic wire frame

For my wire frame I used adobe XD, you can walk through my proposed application and see how the pages will link. This is a basic wire frame with no styling and will not be how the final application will look like.
Link to wire frame: https://xd.adobe.com/view/8573f601-9d27-4027-ad5b-5fed236703af-d020/?fullscreen
Build

For this project I decided to build this application using Ruby on Rails for the back-end and React for the front end. This was the first time I had used Ruby on Rails for a major project and as part of the project we were instructed by General Assembly that we were not allowed to use scaffolding.

## Back End

[link to backend](https://github.com/PatrickMall/sorcery-portal-backend)

As part of the backend I needed to create a user sign up and login system. For this I used the Devise gem which made the authentication system much easier to create and use. After some struggle and hard work I eventually was able to get the user authentication and bearer token to be returned when I made API calls from postman.
Below is the code I created to allow users to register and delete their account for the application.

```ruby
class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

private

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :phone_number])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :phone_number])
  end

  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: {
        status: { code: 200, message: "Signed up successfully." },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    elsif request.method == "DELETE"
      render json: {
        status: { code: 200, message: "Account deleted successfully." }
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
      }, status: :unprocessable_entity
    end
  end
end
```

Another piece of code I would like to share from the backend was my creation of the answers controller as this was the most complicated of the controllers to create as the API call needed to be specified to a particular user. Below is a snippet of the update controller that takes the answer to the question and allows the user to update their answer to a specific question.

```ruby
def update
            if current_user
                question_number = params[:id]
                @answer = current_user.answers.find_by(question_id: question_number)
                @answer.user_id= current_user.id
                if @answer.update(answer_params)
                    render json: {status: 'SUCCESS', message: 'answer is updated', data:@answer}, status: :ok
                else
                    render json: {status: 'Error', message: 'Answer is not updated', data:@answer.errors}, status: :unprocessable_entity
                end
            end
        end
```

## Front End

The front end part of the application was a far bigger piece of work than the back end as it needed to display a lot of the information when called from the backend.
The most challenging part of this build was the dashboard page which had a lot of conditional rendering, pagination of the answers and challenges in how to display the data.
I think the best part of this code was my pagination display of the answers, here is an snippet of the function that displays the data and creates the pagination feature

```javascript
async function fetchQuestionsAndAnswers() {
  const questionOffset = (currentPage - 1) * perPage;
  const answerOffset = (currentPage - 1) * perPage;

  const [questionData, answerData] = await Promise.all([
    authAxios.get(
      `${apiRoute}api/v1/questions?limit=${perPage}&offset=${questionOffset}`
    ),
    authAxios.get(
      `${apiRoute}api/v1/answers?limit=${perPage}&offset=${answerOffset}`
    ),
  ]);

  // map that renders answers from DB
  let fetchedAnswers;
  if (!updateOpen) {
    fetchedAnswers = answerData.data.data
      .sort((a, b) => a.question_id - b.question_id)
      .map((answer) => (
        <li className="m-8 flex" key={answer.question_id}>
          <div className="h-64 overflow-scroll scrolling">{answer.answer}</div>
          <div>
            <button
              id={answer.question_id}
              onClick={() => {
                setUpdateOpen(true);
                setUpdatedAnswer(answer.answer);
              }}
              className="button text-black my-2 mx-8"
            >
              Update
            </button>
          </div>
        </li>
      ));
    // Option that turns answer text into a textarea to edit the answer
  } else {
    fetchedAnswers = answerData.data.data
      .sort((a, b) => a.question_id - b.question_id)
      .map((answer) => (
        <li className="m-8 flex" key={answer.question_id}>
          <form className="overflow-scroll scroll scrolling">
            <textarea
              id={answer.question_id}
              className="w-[800px] h-64 bg-black-transparent2 border border-gold rounded-lg box-shadow focus:outline-none p-4 m-2"
              value={updatedAnswer}
              onChange={(e) => setUpdatedAnswer(e.target.value)}
            />
          </form>
          <div>
            <button
              id={answer.question_id}
              onClick={(e) => {
                saveUpdate(e);
              }}
              className="button text-black my-16 mx-16"
            >
              Save
            </button>
          </div>
        </li>
      ));
  }
  // map that renders questions from DB
  const fetchedQuestions = questionData.data.data.map((question) => (
    <li className="m-8" key={question.id}>
      <div className="h-32 text-lg overflow-scroll scrolling">
        <span className="forum text-3xl">{question.id}.</span>
        <br />
        {question.text}
      </div>
    </li>
  ));

  setQuestions(fetchedQuestions);
  setAnswers(fetchedAnswers);
}
```

As you can see in the API request the call defines what question and answer are needed for each page based on an offset value. When the user clicks the next or back button at the bottom of the page the offset value is increased/decreased by one and a new API request sends for the next question and answer data.

## Bugs, Blockers & Wins

The major block that I had when I started creating the front end login system was a rather strange bug when using axios to send the login request. The problem was that I was storing the bearer token to local storage but then sending the original token back to the login route when it had expired.

The way I resolved this was that I noticed that the token was being sent through the network tab on chrome which led me to find that I needed to change the shared Axios component that I was using which sent the bearer token from local storage.

Here I sent a custom axios request for the login which you can see below instead of the Authaxios component which I created for every other route.

```javascript
const submit = async () => {
  user = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post(`${apiRoute}login`, { user: user });
    const tokenResponse = response.headers.get("Authorization");

    localStorage.setItem("token", tokenResponse);
    console.log(localStorage);
    window.location.href = "/";
  } catch (error) {
    setError("");
  }
};
```

Here is the general authAxios component which I use for every other request

```javascript
const authAxios = axios.create({
  baseURL: "https://sorcery-portal-backend.herokuapp.com",
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});
```

The other major block I had was in trying to deploy the back end to heroku and setting up the secret key as an environment variable, this took some time to work out and I had to change the settings in my cors.rb file so it read the key from the appropriate environment variable.
A massive win for this project was actually creating an entire full stack application by myself and learning a huge amount of stuff about development and really cementing my knowledge of several technologies. I was incredibly happy that I was able to get the application live and working on the server and has been of value to my partners business already.

## MIT License

Copyright (c) [2023] [Patrick Mallery]
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
