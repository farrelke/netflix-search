# netflix-search
Simple shell tool to search for movies on the canistream.it api.


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

```sh
 $ netflix search
```

Now type in the movie you want to watch. You should be presented with a list of options, use the up and down arrow keys to navigate. Using the right arrow key you can then select any link you would like to view and then press enter. This will open the link in your default browser.

supported links: imdb,rotten tomatoes, netflix, amazon prime.


```sh
 $ netflix go <movie titile>
```

This will bring you directly to the netflix for the movie you want to watch if it's available.


```sh
 $ netflix random [options]
```

This will present you with a random movie from netflix. You can make your random be filtered by the following options.

##### Options

`-r, --rating <rating>` lowest rating movie you want to see.

`-a, --actor <actor>` search by actor

`-d, --director <director>` search by director

`-k, --keyword <keyword>` search by keyword







## Example
	
![alt tag](https://raw.githubusercontent.com/farrelke/netflix-search/master/screencast.gif)