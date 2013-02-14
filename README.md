
homework #6: Upgrading the FB app

Da bomb version
We're going to update the Facebook app you guys created during the last homework. We're sick of being restricted to our own little world inside of MyFacebookSpace with all of our friends being on actual Facebook! We're going to add functionality in order to interact with Facebook!

We want to be able to look at our friend's photos and comment on them. For the UI we want the following features:

### Pictures of us/our friends displayed through [rcarousel](http://ryrych.github.com/rcarousel/), a cool jQuery plugin

To set it up, just download it, unzip it, then copy and paste the widget directory into your project's public/javascript directory. Then just follow the instruction given in the [getting started](http://ryrych.github.com/rcarousel/#getting-started) setion. You may find this [html to jade converter](http://html2jade.aaron-powell.com/) useful, if you're to lazy to convert the sample html to jade yourself. Also, Remember, files in an app's public folder (like `public/javascripts/`) are located in the root of your URL (like `/javascripts/`). So the widget directory should be accessible from localhost:3000/javascripts/widget. 

Once you get a basic image carousel working, try adding on cool configurations, or some of your own css styles. One thing your probably gonna want to do is navigate your carousel. To do that read the [navigation section](http://ryrych.github.com/rcarousel/#navigation). If you want to configure the carousel, you do so by passing in a javascript object to the rcarousel initializer, as seen here.

```
$( ".wrapper" ).rcarousel({
  width: 200,
  height: 300, 
  visible:1, 
  step:1
})
```

The `visible` and `step` options are probably ones you'll want to change right away, to make it so one picture displays at a time. Just make sure your `step` is not greater than your `visible` or else you'll get a confusing error. By default both are 3 I believe. Read more about this stuff more on the rcarousel site.

#### Facebook Scope

(Not Facebook SCOPE.) Whenever you try anything interesting with your Facebook app, they start whining about "privacy issues" and "personal information". Don't worry, we just have to ask for the right permissions. In OAuth, the types of personal information you request are called the `scope` of the request. Check these out:

* **[Extended Profile Properties](https://developers.facebook.com/docs/reference/login/extended-profile-properties/)** &mdash; `user_photos`, `friends_education_history`, `friends_relationships`, `friends_relationship_details` ... Tons of useful and juicy information about your friends.
* **[Extended Permissions](https://developers.facebook.com/docs/reference/login/extended-permissions/)** &mdash; `publish_stream` lets you publish photos, text, videos, and "I tried" stickers to your profile

Depending on what kind of `scope` permissions you use, the Facebook login dialog box will ask for different permissions. Try it out: Set your `Facebook.loginRequired()` line to:

```
Facebook.loginRequired({
  scope: ['user_photos', 'friends_photos', 'publish_stream']
})
```

Now you can use the `facebook-node-sdk` to retrieve your friends' images and post comments on them.

### As we see each image in the carousel, we should be able to add a comment to it.

If you read through the introduction for rcarousel you will have noticed that you can include ANY arbitrary group of html elements in the carousel. You can have scrolling  tables, or divs, or a tags or whatever. So one way you could try implementing this feasture is by wrapping each image you want to display in a div along with a textarea or input type=text tag. This will allow you to scroll images with text boxes attached, for easy captioning. This is probably the easiest way to create this feature, but certainly not the only way or the best. So if you have time, try a different solution.

* The comment should be pushed over to Facebook so that everyone else can see it. 
* Push to Heroku.
* Update the homework sheet

### Twitter Bootstrap

We're not gonna teach you this! But literally every site on the Internet (statistically) uses Twitter Bootstrap, so it's worth mentioning. Go to [http://bootstrapcdn.com/](Bootstrap CDN) and copy these lines and add them to your `layout.jade`:

```
link(href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css", rel="stylesheet")
script(src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/js/bootstrap.min.js")
```

Look through the [Twitter Bootstrap Documentation](http://twitter.github.com/bootstrap/) and see all the classes and IDs you can add to make your website look pretty with literally zero effort. Specifically, check out `row` and `span-*` (number) classes for make columns really easily. Also, you'll want to add a `div(class="container-fluid")` around all of your content in `layout.jade`. Play around, add some classes, have fun, be an Internet hipster.

## Refactor your entire codebase

Just kidding. You're done. Good job.

<img src="http://media.tumblr.com/tumblr_mcdnmiaNYr1r3jdkc.png" width="100">

This is the last of the homeworks. Once you finish congratulate yourself by smashing your laptop to bits. Or by watching the [best show ever](https://www.google.com/search?q=adventure+time+streaming&oq=adventure+time+streaming).
