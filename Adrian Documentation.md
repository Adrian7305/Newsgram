# **Adrian Documentation**





##### **Architecture**:

src/

├── api/

│   └── api.js           // API service layer

├── hooks/

│   ├── useFetchPosts.js // Post fetching logic

│   └── useInfiniteScroll.js // Scroll detection

├── components/

│   └── LoadingSkeleton.js // Loading UI

├── App.js               // Main component

└── index.js





###### **Core Functionality**:



**Mock Backend (JSON-Server):**



**File:** db.json



**Contains:**

10 blog posts with metadata

Comments linked to posts

Rich data structure (timestamps, tags, likes)



**Endpoints:**

GET /posts?\_page=1\&\_limit=5 - Paginated posts

GET /comments?postId=1 - Post comments



**API Service (api.js):**



export const fetchPosts = async (page = 1, limit = 5) => {

&nbsp; const response = await API.get(`/posts?\_page=${page}\&\_limit=${limit}`);

&nbsp; return response.data;

};



**What it does:**

* Centralized API calls
* Handles pagination parameters





**useFetchPosts Hook:**



const useFetchPosts = (page, limit = 5) => {

&nbsp; // State management

&nbsp; const \[posts, setPosts] = useState(\[]);

&nbsp; const \[loading, setLoading] = useState(true);

&nbsp; const \[hasMore, setHasMore] = useState(false);



&nbsp; useEffect(() => {

&nbsp;   // Fetch data and update state

&nbsp;   fetchPosts(page, limit).then((newPosts) => {

&nbsp;     setPosts((prev) => \[...prev, ...newPosts]);

&nbsp;     setHasMore(newPosts.length === limit);

&nbsp;   });

&nbsp; }, \[page, limit]);



&nbsp; return { posts, loading, hasMore };

};



**What it does:**

* Manages post data state
* Handles pagination logic
* Tracks loading status
* Detects when all data is loaded



**useInfiniteScroll Hook:**



const useInfiniteScroll = (loading, hasMore, onLoadMore) => {

&nbsp; const observerRef = useRef();



&nbsp; const lastElementRef = useCallback((node) => {

&nbsp;   if (loading || !hasMore) return;

&nbsp;   

&nbsp;   // Disconnect previous observer

&nbsp;   if (observerRef.current) observerRef.current.disconnect();



&nbsp;   // Create new observer

&nbsp;   observerRef.current = new IntersectionObserver((entries) => {

&nbsp;     if (entries\[0].isIntersecting) {

&nbsp;       onLoadMore();

&nbsp;     }

&nbsp;   });



&nbsp;   if (node) observerRef.current.observe(node);

&nbsp; }, \[loading, hasMore, onLoadMore]);



&nbsp; return lastElementRef;

};



**What it does:**

* Uses Intersection Observer API
* Triggers load more only when needed
* Automatically disconnects observers
* Prevents duplicate calls



**Loading Skeleton Component:**



const LoadingSkeleton = () => (

&nbsp; <div className="skeleton">

&nbsp;   <div className="skeleton-title" />

&nbsp;   <div className="skeleton-body" />

&nbsp; </div>

);



**What it does:**

* Visual feedback during loading
* Prevents content jumps
* Improves perceived performance





##### **How It Works Together**



**Initialization:**



* App mounts with page=1
* useFetchPosts fetches first 5 posts



**Scroll Detection:**



When user scrolls to last post:

* useInfiniteScroll triggers
* page state increments
* useFetchPosts fetches next page
* New posts append to existing list



**Termination:**



Stops fetching when:

* API returns fewer items than limit
* hasMore becomes false



**Loading States:**



* Shows skeletons during fetch
* Hides loader when no more data

##### 

##### **Setup Instructions:**



**Install Dependencies:**

npm install axios json-server



**Start Backend:**

npx json-server --watch db.json --port 5000



**Run React App(In parallel terminal):**

npm start

