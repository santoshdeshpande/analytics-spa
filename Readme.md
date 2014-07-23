### Content ###

* Quick summary
* Learn about Markdown
** [Bitbucket Supported Markdown for READMEs, comments, and Wiki](https://bitbucket.org/tutorials/markdowndemo)
** [Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Summary ###

This project uses mainly [AngularJS](https://angularjs.org/) and [D3js](https://github.com/mbostock/d3/wiki). For dynamic reloading and asset compilation during **development** we use [GulpJS](https://github.com/gulpjs/gulp/)
To use gulp during development, navigate to ```ng-app``` and run it with ```gulp```.

Before each commit, please make sure you also run ```gulp build``` so that assets will be compiled, minified and placed into ```vendor/assets```. Please see file ```ng-app/gulpfile.js``` for the major steps involved in this.

Some of the gulp plugins - ```gulp-haml``` and ```gulp-sass``` - require and installation of a recent Ruby runtime, along with several gems. See the installation instructions below.

### Installation instructions ###

## NPM modules and Bower plugins ##

Simply navigate into ```ng-app``` and run ```npm install```. Test the installation by running ```gulp``` and navigate to ```http://localhost:4000``` - please watch the console output where gulp runs and look for possible error messages.

## Ruby runtime ###

It is recommend to use [rbenv](https://github.com/sstephenson/rbenv) - a Ruby environment manager, instead of the default Ruby installation. It is light-weight and provides an isolated environment for a specific Ruby version and also a separate home for gems. Another popular Ruby version manager is [RVM](https://rvm.io/) - however, it is mostly used on the server-side and much more heavy. RbEnv is recommended.

# Install RbEnv on Ubuntu Linux #

Optional step - Clear old ruby.

```bash
######## Removing Ubuntu's old rvm and ruby ###########
sudo apt-get remove --purge ruby-rvm ruby
sudo rm -rf /usr/share/ruby-rvm /etc/rmvrc /etc/profile.d/rvm.sh
####### Delete old folders them (ignoring those that don't exist) ###########
sudo rm -rf ~/.rvm* ~/.gem/ ~/.bundle*
```


Install the necessary system packages

```bash
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev
sudo apt-get libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties
```

Now install RbEnv

```bash
cd
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

rbenv install 2.1.2
rbenv global 2.1.2
ruby -v
```

The last step is to tell Rubygems not to install the documentation for each package locally

```bash
echo "gem: --no-ri --no-rdoc" > ~/.gemrc
```

# Install RbEnv on Mac OSX #

First, we need to install Homebrew. Homebrew allows us to install and compile software packages easily from source.

Homebrew comes with a very simple install script. When it asks you to install XCode CommandLine Tools, say yes.

Open Terminal and run the following command:

```bash
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

Now install RbEnv

Now that we have Homebrew installed, we can use it to install Ruby.

We're going to use rbenv to install and manage our Ruby versions.

To do this, run the following commands in your Terminal:
```bash
brew install rbenv ruby-build

# Add rbenv to bash so that it loads every time you open a terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile

# Install Ruby 2.1.2 and set it as the default version
rbenv install 2.1.2
rbenv global 2.1.2

ruby -v
# ruby 2.1.2
```

> **Note:** 
> It is very important to make sure, that RbEnv is loaded in your shell!!
> Do not forget to add it to your .bash_profile (Mac, Ubuntu Server) or .bashrc (Ubuntu Desktop)
> ```echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile```
> This step is included in the above instructions.