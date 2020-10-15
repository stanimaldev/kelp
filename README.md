[<h1>Kelp</h1>](https://stanjdev.github.io/kelp/)
<h2>Business Search Web App Tool</h2>

<em>"Search for your favorite coffee shop in real-time with an interactive map view"</em>

<h3>Summary:</h3>
<ul>
<li>Responsive business search tool created with an interactive Mapbox map view to find businesses from retrieved Yelp API data</li>
<li>Client-side fetch of Yelp API endpoints implemented using <a href="https://cors-anywhere.herokuapp.com/" target="_blank">CORS Anywhere</a></li>
</ul>

• React, Redux, JavaScript, SCSS, CSS keyframe animations, 
  Yelp API and Mapbox API
  
• Created an interactive Map View for search results from  
  retrieved Yelp data
  
• Converted class-based Components into functional 
  components with React Hooks


<div className="projectInfo">
<div className="container__grey projectInfo__block">
<h2>Project Brief:</h2>
<p>Codecademy Pro Capstone <br/> React Project</p>
</div>

<div className="container__grey projectInfo__block">
<h2>Timeline:</h2>
<p>August 2020 - September 2020</p>
</div>

<div className="container__grey projectInfo__block">
<h2>Role / Skills:</h2>
<p>Lead Developer</p>
</div>
</div>

<div className="container container__grey">
<h2>Technologies Used:</h2>
<div className="technologies">
<ul>
<li>React</li>
<li>Redux</li>
<li>JavaScript</li>
<li>SCSS</li>
<li>CSS keyframe animations</li>
</ul>
<ul>
<li>Yelp API</li>
<li>Mapbox API</li>
<li>CORS Anywhere</li>
<li>Single Page Application</li>
</ul>
</div>
</div>



<section className="container">
<h1>Challenges: </h1>
</section>

<section className="container container__grey">
<h2>Creating a Custom, Interactive Map</h2>
<p>
Using the React Hook, <code>useEffect()</code>, I created a function to toggle an "active" CSS class, 
adding or removing highlighting styling whenever users click on any map markers. 
Concurrently, I used <code>scrollIntoView</code> with <code>behavior: "smooth"</code> to effortlessly glide to 
the business listing of the selected map marker.
</p>

</section>


<section className="container container__grey">
<h2>Clearing existing markers from previous searches</h2>
<p>
Using the React Hook, <code>useRef()</code> and the <code>.current</code> property, I was able to retrieve the 
existing array of map markers from the previous search and compare it against 
the new array of businesses populated by Yelp from running a new search. 
</p>
<p>
If those two arrays weren't exactly alike, I used the built-in MapBox 
<code> marker.remove() </code> function to clear all markers from the map.
</p>

<pre className="pre">
<code >
{`if (currentMarkers.current !== businesses) {
currentMarkers.current.forEach(marker => marker.remove());
}
`}
</code>
</pre>
</section>


<section className="container container__grey">
<h2>Map resizing bug: Required automatic triggering of window-resizing event </h2>
<p>
For my map's display/hide toggle, I came across a bug where the Mapbox map displayed inconveniently at 1/4th the 
container's size when toggling to display. The only way to set the size back to normal was by resizing the window manually.
</p>
<p>
In my map toggle button's <code>handleClick</code> function, I included this <code>setTimeout()</code> function to dispatch 
a window resize trigger event to automatically cause a resize AFTER the map displayed from invisible to visible.
</p>

<pre className="pre">
<code >
{`setTimeout(() => {
window.dispatchEvent(new Event('resize'))
}, 0)
`}
</code>
</pre>
</section>


<section className="container container__grey">
<h2>Loading JS script into the React project on mount</h2>
<p>In order for the Mapbox API to create and load the map on mount, I had to figure out how to load the Javascript <code>{`<script>`}</code> file from a CDN, 
(as you would normally insert the <code>{`<script>`}</code> tag right before the closing <code>{`<body>`}</code> tag of an HTML file). </p>

<p>I used this custom <code>loadScript</code> function that takes in any CDN URL and injects it into the React-rendered HTML page on mount, similarly to placing the <code>{`<script>`}</code> tag in the HTML file manually. </p>

<pre className="pre">
<code >
{`function loadScript(url) {
const index = window.document.getElementsByTagName("script")[0];
const script = window.document.createElement('script');
script.src = url;
index.parentNode.insertBefore(script, index);
`}
</code>
</pre>
</section>
