const articles = {
    about: `
  <div class="article-typography">
  <h1>About ASC</h1>
  <h2>What is ASC?</h2>
    <p>AI Study Companion (ASC) is an in progress, AI powered study companion hosted on the web. ASC can track the users progress in selected subjects, and pushes them in the correct direction to facilitate learning.</p>
  <h2>Why choose ASC?</h2>
    <p>ASC differs from other study companions with its built in AI capabilities. ASC will not use AI to verify a students work, but to procedurally generate questions and study materials tailored to each individaul user. The more you interact with ASC, the better ASC will grow to understand your strengths and weaknesses regarding various subjects.</p>
  <h2>What technologies does ASC utilize?</h2>
    <p>ASC will be a full-stack web application with a React front-end and a Python back-end utilizing the FastAPI library.</p>
  <h2>Who created ASC?</h2>
    <p>ASC is a student created senior project for Pennsylvania Western University driven by the following members:</p>
    <ul>
      <li>Cameron Calhoun</li>
      <li>Gage Keslar</li>
      <li>Jonathan Buckel</li>
      <li>Seth Morgan</li>
    </ul>
    <p>All members are students of Pennsylvania Western University studying Computer Science.</p>
  <h2>Gantt Chart</h2>
    <h3>Updated 1/24/24</h3>
    
<iframe 
  class="w-full h-[1000px] max-w-screen-lg mx-auto rounded-lg shadow-lg"
  src="Gantt Chart - Senior Project.pdf#toolbar=1&zoom=page-fit" 
  title="Gantt Chart - Senior Project"
></iframe></div>
    `,
    week1: `
  <div class="article-typography">
  <h1>Week 1</h1>
  <h2>Summary:</h2>
    <p>Week 1 was entirely lectures, and thus no report was completed. Reports begin in week 2.</p>
</div>
  `,
    week2: `
  <div class="article-typography">
  <h1>Week 2</h1>
  <h2>Summary:</h2>
    <p>This first week was spent setting up our development environment, developing the project website, and making the Gantt chart. Overall, everything went according to plan. The only change made is that we will no longer be using Docker. Due to compatibility challenges we reevaluated our need for Docker and realized that we would be able to work fine without it.</p>
  <h2>What was Accomplished:</h2>
    <ul>
      <li>Gantt Chart</li>
      <li>Git Repository</li>
      <li>FastAPI and React communcation</li>
      <li>Website for weekly reports</li>
    </ul>
  <h2>Problems Encountered:</h2>
    <ul>
      <li>Docker compatability issues</li>
    </ul>
  <h2>Plans to Overcome Problems:</h2>
    <ul>
      <li>No longer using Docker. We determined that we wouldn't be losing annything by not using it.</li>
    </ul>
  <h2>Plans for next week:</h2>
    <ul>
      <li>Get API keys</li>
      <li>Begin backend development</li>
    </ul>
  <h2>Member Contributions:</h2>
    <ul>
      <li>Cameron Calhoun - Website</li>
      <li>Jonathan Buckel - Weekly Report</li>
      <li>Gage Keslar - Gantt Chart</li>
      <li>Seth Morgan - Presentation</li>
    </ul>
  </div>
  `,
    week3: `
  <div class="article-typography">
  <h1>Week 3</h1>
  <h2>Summary:</h2>
    <p>This second week of the project was focused primarily on OpenAI API Integration, and developing a working demo for this integration. We first obtained tokens for communicating with the AI model. These are spent with each message sent and received. Limits were set on the amount of there tokens used, as well as monetary monthly limits on OpenAI. To communicate with the AI model, we must make requests through an API. This meant we had to develop a way to store our API keys. This was done through the python-dotenv library, and making use of .env files. This hides the API key from the project itself, and makes the key secure. If we were to expose our API key to the web, our tokens could be used by malicious, outside users, and our wallets drained. The rest of the time this week was spent developing our communication with the AI model, and developing a simple chat bot we can communicate with. This will allow easy integration of features in the program that require communicating with the AI model.</p>
  <h2>What was Accomplished:</h2>
    <ul>
      <li>AI tokens acquired</li>
      <li>OpenAI API communication established</li>
      <li>Proper storage and hiding of API keys</li>
      <li>Simple chat bot created</li>
    </ul>
  <h2>Problems Encountered:</h2>
    <ul>
      <li>Potential abuse of tokens</li>
      <li>Setting up API keys across all developers environments</li>
    </ul>
  <h2>Plans to Overcome Problems:</h2>
    <ul>
      <li>No longer using Docker. We determined that we wouldn't be losing annything by not using it.</li>
    </ul>
  <h2>Plans for next week:</h2>
    <ul>
      <li>Establish User class</li>
      <li>Establish Subject Classes</li>
    </ul>
  <h2>Member Contributions:</h2>
    <ul>
      <li>Cameron Calhoun - Weekly Report</li>
      <li>Jonathan Buckel - AI communication, python-dotenv implementation</li>
      <li>Gage Keslar - AI communication, presentation, chat bot</li>
      <li>Seth Morgan - AI communication</li>
    </ul>
  </div>
  `,
    week4: `
  <div class="article-typography">
  
  <h1>Week 4</h1>
  <h2>Summary:</h2>
    <p>This week our focus was directed towards developing the User and Subject classes, and using them to interact with out chat bot. If you recall from our report last week, we were able to successfully establish communication with OpenAI’s GPT-4o model, and we could send and receive messages through our terminal. This week we wanted to focus these messages on the actual application of our program, and create some of the classes elaborated on in our specification document to facilitate this process. A Subject class was created which will be the parent class of all specific subjects, and contain all methods of said derived classes. This will allow for a very modular program, in which additional subjects can be easily added by deriving a new class. We created an English class to showcase the bots new functionality. In addition, we created a User class which stores a users data on which subjects they are tracking. In addition, this class contains methods to add and remove classes, as well as import and export user data using JSON.</p>
  <h2>What was Accomplished:</h2>
    <ul>
      <li>Subject class created</li>
      <li>English class created</li>
      <li>User class created</li>
      <li>Chat bot subject interaction completed</li>
    </ul>
  <h2>Problems Encountered:</h2>
    <ul>
      <li>Structure of subject class</li>
      <li>Other coursework</li>
    </ul>
  <h2>Plans to Overcome Problems:</h2>
    <p>The only real issue found in this weeks work was discussing the data types for the subject class. At one point, we had debated using a list for the subjects prompts, but elected for a dictionary in order to increase readability within the program. Other coursework kept us occupied as well, and was something to juggle on top of this weeks work.</p>
  <h2>Plans for this Week:</h2>
    <ul>
      <li>Create remaining subject classes</li>
      <li>Further work on back end</li>
    </ul>
  <h2>Member Contributions:</h2>
    <ul>
      <li>Cameron Calhoun - Weekly Report, Subject class, User class</li>
      <li>Gage Keslar - Powerpoint, Chat bot updates, English class</li>
      <li>Seth Morgan - Communicated some ideas, began prototype Math class</li>
      <li>Jonathan Buckel - Communicated some ideas</li>
    </ul>
</div>
  `,
    week5: `
  <div class="article-typography">
  <h1>Week 5</h1>
  <h2>Summary:</h2>
    <p>This week our focus was directed towards developing the remaining subject classes and further developing the back end. Geography, History, and ComputerScience classes were created and fleshed out to the same degree as English. Additionally, Math was completed. They currently all only have 3 prompts and breakpoints, and are worded similarly to English. Over the next week or two, we will be honing in on these prompts and breakpoints to ensure that a smooth generation is created. We additionally spent time locking down the chatbot, such that users cannot send nonsense to it. It now only accepts selections for questions. In incorporating multiple subjects into the chatbot, some changes needed to be made to User and Subject. Namely, changing the storage of classes in User from a list to a dictionary. This allows us to reference a class from user using a key value pair, where the key is the name of the subject, and the value is the class itself.</p>
  <h2>What was Accomplished:</h2>
    <ul>
      <li>Geography class created</li>
      <li>History class created</li>
      <li>Computer Science class created</li>
      <li>Math class completed</li>
      <li>User class edited</li>
      <li>Chatbot locked down </li>
    </ul>
  <h2>Problems Encountered:</h2>
    <ul>
      <li>Poor indexing for User.subjects</li>
      <li>Prompt specific issues</li>
    </ul>
  <h2>Plans to Overcome Problems:</h2>
    <p>We redefined User.subjects into a dictionary, such that we could use the names of the subjects as keys in key value pairs. This way, we can directly address a subject instead of looping through User.subjects entirely to find a reference each time. Additionally, the prompts can sometimes generate vague answers, and create confusion. We will solve this in the coming weeks by engineering the prompts carefully.</p>
  <h2>Plans for this Week:</h2>
    <ul>
      <li>Complete APITools logic</li>
      <li>Engineer prompts that do not confuse the bot for each class</li>
    </ul>
  <h2>Member Contributions:</h2>
    <ul>
      <li>Cameron Calhoun - Weekly Report, Geography class, History class, ComputerScience Class, completed Math class, restructured User class, Powerpoint</li>
      <li>Gage Keslar - Communicated some ideas, helped reformat classes</li>
      <li>Seth Morgan - Reformatted to fit design specifications, restricted chatbot</li>
      <li>Jonathan Buckel - Communicated some ideas, helped reformat classes</li>
    </ul>
  </div>
  `
}

export default articles
