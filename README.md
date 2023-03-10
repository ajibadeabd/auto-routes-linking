<div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]"><div class="flex flex-grow flex-col gap-3"><div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">


<h1>Auto Routes Linking</h1><p>Auto Routes Linking is an npm module that helps you automatically create routes for your ExpressJS application based on the file and folder structure in your project. By default, all route files should be located in the "src/routes" folder. However, you can specify a different route path if needed.</p><h2>Installation</h2><p>To install Auto Routes Linking, run the following command in your terminal:</p>

```

npm i auto-routes-linking

```

<div class="markdown prose w-full break-words dark:prose-invert light"><p>Auto Routes Linking is a Node.js module that helps create routes automatically in a express.js app. It simplifies the process of creating routes by following the file and folder structure in Next.js.</p><p>The default location for route files is the "routes" folder, which is located in the "src" directory. However, this can be changed by specifying a different path when using the npm module.</p><p>By default, the prefix for all auto-generated routes is "api". This can be changed by specifying a different prefix when using the npm module.</p><p>To create a route, you simply need to create an index.js file in the appropriate folder. For example, to create a route for "api/user", you can create an index.js file in the "routes/user" folder and specify the appropriate method:</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class=""></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript"><span class="hljs-string">"get.user"</span> = <span class="hljs-function">(<span class="hljs-params">request,response</span>)=&gt;</span>{
  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">"get route for api/user"</span>)
}
</code></div></div></pre><p>Supported methods include GET, POST, PUT, and PATCH.</p><p>If you have many routes, it can become unwieldy to put them all in a single index.js file. To address this, you can create a folder for each route and include an index.js file in each folder. For example, to create routes for "api/user" and "api/product", you can create two folders named "user" and "product" in the "routes" folder, each with its own index.js file.</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class=""></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-markdown">routes
   -user
<span class="hljs-code">     -index.js
   -product
     -index.js
</span></code></div></div></pre><p>Inside each index.js file, you can specify the appropriate methods for the route. For example:</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class=""></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript">get = <span class="hljs-function">(<span class="hljs-params">request,response</span>)=&gt;</span>{
  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">"get route for api/user"</span>)
}

post = <span class="hljs-function">(<span class="hljs-params">request,response</span>)=&gt;</span>{
  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">"get route for api/user"</span>)
}
<span class="hljs-keyword">delete</span> = <span class="hljs-function">(<span class="hljs-params">request,response</span>)=&gt;</span>{
  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">"get route for api/user"</span>)
}

<span class="hljs-keyword">export</span> = {
  get,
  post,
  <span class="hljs-keyword">delete</span>
}
</code></div></div></pre><p>You can also create dynamic routes using the "[param]" syntax. For example, to create a route for "api/user/:user", you can create a folder named "[user]" inside the "routes/user" folder, and include an index.js file inside the "[user]" folder.</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class=""></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sql">routes
   <span class="hljs-operator">-</span><span class="hljs-keyword">user</span>
     <span class="hljs-operator">-</span>index.js
     <span class="hljs-operator">-</span>[<span class="hljs-keyword">user</span>]
       <span class="hljs-operator">-</span>index.js
</code></div></div></pre><p>Inside the index.js file, you can specify the appropriate methods for the dynamic route. For example:</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class=""></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript">get = <span class="hljs-function">(<span class="hljs-params">request,response</span>)=&gt;</span>{
  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">"get route for api/user/:user"</span>)
}

<span class="hljs-keyword">export</span> = {
  get
}
</code></div></div></pre><p> </p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class=""></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-c"> <span class="hljs-keyword"></span> 
</code></div></div></pre><p>You can then import the module and use it to automatically generate routes:</p><pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class=""></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> routeLinking = <span class="hljs-built_in">require</span>(<span class="hljs-string">'auto-routes-linking'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>()

<span class="hljs-title function_">routeLinking</span>(app)<span class="hljs-comment">// default prefix is "api" and default route path is "src/routes". To change this, you can specify the prefix and path as arguments:</span>
<span class="hljs-title function_">routeLinking</span>(app,<span class="hljs-string">"api/v1"</span>,<span class="hljs-string">"/routes"</span>)
<span class="hljs-comment">//or </span>
<span class="hljs-title function_">routeLinking</span>(app,<span class="hljs-string">"api/v1"</span>,<span class="hljs-string">"/anything"</span>)

app.<span class="hljs-title function_">listen</span>(<span class="hljs-number">3000</span>, <span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Example app listening on port 3000!'</span>);
});
</code></div></div></pre></div></div></div><div class="flex justify-between"><div class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible"><button class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></button><button class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg></button></div></div></div>