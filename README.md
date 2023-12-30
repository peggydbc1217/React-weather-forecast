# 🌤️React-Firebase-Weather-Forecast🌤️

This application is designed to check current weather conditions and provide future five-day weather information. The API is provided by [OpenWeather](https://openweathermap.org/).<br/>

# 🚧Project Status🚧

Completed on 29th December 2023.

# 🌟Features🌟
🌤️ Check the current weather conditions for a specific city.</br>
📊 View a five-day weather forecast for a specific city.</br>
🔐 Authenticate with your Google account (Login).</br>
💾 Save your searched cities in Firebase.(Need to Login with Google)</br>

# 🌐Live Demo🌐
It's deployed and accessible via the following links:<br>
[WeatherForecast on Vercel](https://flight-ease.vercel.app/) or [Youtube Video Demo](https://youtu.be/QPSk5l9OzSA).

# 📷Screen Shot(s) of some features 📷

#### 1.Weather Search

![image](https://github.com/peggydbc1217/React-NodeJS-FlightSearch/blob/master/flightSearch.gif)


# Tools

### Front end

[![My Skills](https://skillicons.dev/icons?i=ts,react,redux,styledcomponents,html,css)](https://skillicons.dev)<br/>
React Router, React Hook form, React hot toast, React lazy image component, React icons, ChartJS, Prime React

### Data Base 
[![My Skills](https://skillicons.dev/icons?i=firebase)](https://skillicons.dev)</br>


### Build Tool
[![My Skills](https://skillicons.dev/icons?i=vite)](https://skillicons.dev)</br>


### Deploy
[![My Skills](https://skillicons.dev/icons?i=vercel)](https://skillicons.dev)</br>


### Version control
[![My Skills](https://skillicons.dev/icons?i=git,github)](https://skillicons.dev)</br>


### Editor
[![My Skills](https://skillicons.dev/icons?i=vscode)](https://skillicons.dev)</br>


# 🤔Reflection🤔

## What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)

This was a side project that showcases what I've learned since Sept 2023, espically for typescript and styled-component.

## What did you set out to build?

I am a travel enthusiast who frequently searches for cheap flights in my free time, I decided to apply all the frontend development skills I've learned to create a similar website. The goal was to assist people in discovering flight options and accessing information about airports.

## Did you work on your side project independently, or did you collaborate with others?

Approximately 90% of the content was created by me, from scratch to finish. The remaining 10% consisted of only certain CSS Layouts, which my teammates contributed during an online CSS course. It is essential for me beacuse of the chance to pratice git command with others.

## Why was this project challenging and therefore a really good learning experience?

I think the most challenging parts is the fact that **_I had to build an entire website including front end and back end on my own_**. Unlike people in a bootcamp, I didn't have a team to share the workload with. Instead, my teachers were Google, Stack Overflow, and ChatGPT, among others. I spent a lot of time searching the internet for answers to my questions. However, I consider this a valuable learning experience because solving problems independently is an important skill for a developer.

## What were some unexpected obstacles?

1. It was definitely the **authentication and security** part. I used jwt token generated on ther server, sent it to the browser, and tried to store it in the cookie. However, I faced an issue where the **_cookies were not showing up in the browser_**, so I couldn't retrieve the token from the cookie. After doing some research, I found that I needed to make some changes on both server and client side. </br>

Ex. </br>
`withCredentials: true ` </br>
in axios request, </br>
and </br>
`cors({credentials: true, origin: 'https://xxxxxx.com'})` </br>
in server side to allow cookie and bypass the CORS policy. </br>

Since I am using chrome, I also had to set`httpOnly:true ` and `sameSite: 'none'` in res.cookie. Finally, I had to configure the host in the vite.config.js to make everything work. It took me more time than I expected to figure it all out, but it was definitely worth it.

---

2. The second most challenging parts was implementing an **autocomplete input with a debounce function**. Actually, I didn't even know this type of input is called autocomplete in the beginning. Afterward, I found material UI offered a component called [autocomplete](https://mui.com/material-ui/react-autocomplete/), so I tried to use it in my project. </br>

However, I quickly notice that **_once user type a text in the input, it would send a reqeust to the server_**, which was not efficient for performance. To address this, I used a debounce custom hook to limit the number of requests sent to the server. Building up this feature took me about half a day, but it provided me with valuable insights on every aspect of the process.</br>

**Result:**<br/>
![image](https://github.com/peggydbc1217/React-NodeJS-FlightSearch/blob/master/delayedFlights.gif)

```js
const useAirPortDebounce = (value, delay = 500) => {
  // const [debouncedValue, setDebouncedValue] = useState(value);
  const [ariportOptions, setAirportOptions] = useState([]);

  useEffect(() => {
    const id = setTimeout(async () => {
      // setDebouncedValue(value);

      const data = await getAirportInfo(value);
      setAirportOptions(data);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return { ariportOptions };
};

export default useAirPortDebounce;
```

---

3. Third, I have implemented an infinite scroll function using IntersectionObserver to detect when the current view reaches the last element in my FlightList. I set the last element's ref by [ref Callback](https://react.dev/reference/react-dom/components/common#ref-callback). It took me a while to find this solution, but it was definitely worth because it let me know more about using ref with browser API.

```js
//infinite scroll
  const observer = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      // when the last element has been assigned to the observer(which means it has been used), disconnect the previous observer
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // If intersection is detected
         // ..... DO MY LOGIC HERE TO SHOW MORE DATA......
      });
      if (node) observer.current.observe(node);
    },
  );


 //JSX parts
       return
           // check if it is the last element using ref callback(forward ref inside this component)
          if (flightPerPage.length === i + 1) {
            return (
              <SearchResultsItem
                flight={airplane}
                key={key}
                ref={lastElementRef}
              ></SearchResultsItem>
            );
          }
```

![image](https://github.com/peggydbc1217/React-NodeJS-FlightSearch/blob/master/infinite%20scroll.gif)

4. The last thing I'd like to mention is how I worked on **enhancing the user experience and performance**. After deploying the website, I noticed that the **_loading time was a bit slow_**, especially when the internet speed was set to 'Slow3G' in Chrome. **_Some images also not showing up properly when loading_**. </br>

To work out this, I used a lazy loading library called [react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component). This library helps load images only when they become visible in the viewport, which really improved the loading experience.</br>

I also used [React Lazy](https://react.dev/reference/react/lazy#lazy) to achieve Code-Splitting. Loaing certain components, like the one that imports a large third-party library (airlines' full name database), only when they were needed. By using these two libraries, I am able to boost the website's performance.

## Have you encountered any interesting or unexpected insights or learnings while working on your side project?

Yes, before I began my side project, I had already learned certain React skills and libraries, understanding how to implement them and their functioning. However, there was one question I hadn't considered: **When should I use them?** </br>

For example, [React Router loader function](https://reactrouter.com/en/main/route/loader) v.s [Redux thunks](https://redux-toolkit.js.org/api/createAsyncThunk) v.s [React query](https://tanstack.com/query/latest/docs/react/overview). I know you might have understood the diffreences pretty well and doesn't think that is a question🧐🧐. But for me (on that time), I simply knew they can all handle async operations and retrieve data from the server. I relaized that **_I have to think about why I have to use that paticular tool or learn that specific skill before diving into the code_**.</br>

I used React Query to load data with cleaner code and efficient caching when I need them again, I also employed mutation functions to modify data on my database and keep client's cache up to date.

```js
export function useCustomDelete(deleteFn, queryKey, itemId) {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteFn, {
    onMutate: (itemId) => {
      // Using onMutate to get the previous data before deletion
      const previousFavorites = queryClient.getQueryData([queryKey]);
      return previousFavorites;
    },
    onError: (err, variables, previousFavorites) => {
      // Handle errors and roll back to the previous data if needed
      queryClient.setQueryData([queryKey], previousFavorites);
      toast.error(err.message);
    },
    onSettled: () => {
      // Refetch the data after mutation is complete
      queryClient.invalidateQueries([queryKey]);
      toast.success("Delete favorite successfully");
    },
  });

  return mutation;
}
```

I used Redux thunk when I needed more extensive state management after data fetching.

```js
export const fetchNearAirports = createAsyncThunk(
  "nearAirports/fetchNearAirports",
  async (data, { dispatch }) => {
    try {
      const res = await getNearAirports(data);

      let airports = res.data.data;

      if (res.status === 200) {
        airports = airports.filter((airport) => {
          return airport.popularity > 10000;
        });

        if (airports.length === 0) {
          dispatch(setNearAirports([]));
          throw new Error(
            "There is no airport nearby, maybe try to increase the search radius"
          );
        }

        dispatch(setNearAirports(airports));
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
      throw new Error(err.message);
    }
  }
);
```

I used React Router loader function(in different project) to fetch data and implement component lazy loading to improve initial page load performance.

I think this is a very interesting and unexpected insights I have learned from my side project. It is not so difficult to achieve something with the tools you have learned, but it is very important to know when to use them and why you have to use them.

## What future plans or improvements do you have for your side project?

First, some of the components in my project can be refactored using the [compound component design pattern](https://betterprogramming.pub/compound-component-design-pattern-in-react-34b50e32dea0). While I have learned this skill, I haven't applied it to any of my projects.

Second, I plan to learn Tailwind CSS and combine it with styled components, which will enable me to create a more responsive website. While I have a basic understanding of styled components, I haven't yet applied them in my projects.

Third, I am going to implement 3rd OAuth authemtication like Goolgle in my Login in function.

Finally, I am going to learn typescript because it is very popular in the industry and can help developer to avoid certain bugs.

# 📚Where do I learn programming?📚

I've learned everything almost from [Udemy](https://www.udemy.com/).
Here are the courses I have taken.

- [![My Skills](https://skillicons.dev/icons?i=js)](https://skillicons.dev) The Complete JavaScript Course 2023: From Zero to Expert!- _Jonas Schmedtmann_
- [![My Skills](https://skillicons.dev/icons?i=css)](https://skillicons.dev) Build Responsive Real-World Websites with HTML and CSS- _Jonas Schmedtmann_
- [![My Skills](https://skillicons.dev/icons?i=sass)](https://skillicons.dev) Advanced CSS and Sass: Flexbox, Grid, Animations and More!- _Jonas Schmedtmann_
- [![My Skills](https://skillicons.dev/icons?i=react)](https://skillicons.dev) The Ultimate React Course 2023: React, Redux & More - _Jonas Schmedtmann_
- [![My Skills](https://skillicons.dev/icons?i=nodejs,express,mongodb)](https://skillicons.dev) Node.js, Express, MongoDB & More: The Complete Bootcamp 2023 - _Jonas Schmedtmann_
- [![My Skills](https://skillicons.dev/icons?i=react)](https://skillicons.dev) React - The Complete Guide 2023 (incl. React Router & Redux)- _Academind by Maximilian Schwarzmüller_
- [![My Skills](https://skillicons.dev/icons?i=js)](https://skillicons.dev) JavaScript: Understanding the Weird Parts - _Anthony Alicea_

- [![My Skills](https://skillicons.dev/icons?i=typescript)](https://skillicons.dev) Mastering TypeScript - 2023 Edition - _Colt Steele_
- [![My Skills](https://skillicons.dev/icons?i=git,github)](https://skillicons.dev) The Git & Github Bootcamp -_Colt Steele_

- [![My Skills](https://skillicons.dev/icons?i=discord)](https://skillicons.dev)[六角 2023 切版直播班(CSS Online course)](https://www.hexschool.com/courses/web-layout-training-1st.html)

## In progress

- JavaScript Algorithms and Data Structures Masterclass- _Colt Steele_
- The Coding Interview Bootcamp: Algorithms + Data Structures - _Stephen Grider_

## Plan to learn after securing a job

- [![My Skills](https://skillicons.dev/icons?i=nextjs)](https://skillicons.dev) Next.js & React - The Complete Guide (incl. Two Paths!) - _Academind by Maximilian Schwarzmüller_
- [![My Skills](https://skillicons.dev/icons?i=docker)](https://skillicons.dev) Docker Mastery: with Kubernetes +Swarm from a Docker Captain- _Bret Fisher_
