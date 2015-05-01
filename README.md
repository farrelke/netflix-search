# netflix-search
Search,navigate, just randomly pick out a movie on netflix. Do it all from your trusty terminal. This small shell tool is powered using canistreamit.it, netflixroulette.net.


## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already. 

```sh
 $ npm install -g
```

 

## Usage
	

```sh
	$ netflix <command> [options]
```

### Commands


#### netflix search
```sh
 $ netflix search
```
Now type in the movie you want to watch. You should be presented with a list of movie titles. Using your arror keys you will be able to naviagate the list and goto any link you have selected by just pressing enter.

Currently supported links: imdb,rotten tomatoes, netflix, amazon prime.

#### netflix go
```sh
 $ netflix go <movie titile>
```

This will bring you directly to the movie in netflix if it is available.

#### netflix random
```sh
 $ netflix random [options]
```

This is basically a wrapper around netflixroulette.net where you get back a random movie. You can also filter what movie comes back on the following options:

`-r, --rating <rating>` lowest rating movie you want to see.

`-a, --actor <actor>` search by actor.

`-d, --director <director>` search by director.

`-k, --keyword <keyword>` search by keyword.







## Example
	
![alt tag](https://raw.githubusercontent.com/farrelke/netflix-search/master/screencast.gif)