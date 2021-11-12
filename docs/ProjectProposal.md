# SwapéMon

## Application Definition Statement

This application is intended to be a platform to allow users to track Pokémon with their different stats, balls, moves, and abilities, in all their different combinations. The primary implementation purpose is for tracking bred Pokémon to trade to other users or for completion and living Dex purposes. This would primarily be for the handheld games, but with the ability to now transfer Mons to the handheld games from Pokémon Go, there would be a use to track those as well.

## Target Market

The market for Pokémon is somewhat suprising. The demographic tends to be fairly even between men and women in an industry that has traditionally been dominated by men. It also seems to favor those who fall into the early to mid adult range. As seen in Mike Sonders article and to little surprise, the main other identifiable trait is users that play Pokémon tend to play other games as well (Sonders, 2016).


Between the handheld and market and mobile phones for Go, the majority of users are adults. According to Nintendo they have seen the number of people in their 20s and 30s increase in the previous years (Nintend, 2017). This is supported by the article by Jorik Weustink where the largest demographic is between 21-35 (Weustink, 2019). Sonders also shows a similar trend with 46% of users between 18-29 (Sonders, 2016).

There is a pretty close split between men and women either way you look at handheld or mobile. On Go, though it started at nearly 65/35 split favoring women, in recent years that has balanced more to about 53/48 split favoring women (Sonder, 2016). On handheld it favors men a bit more at 58/42 split (Weustink, 2019).

The main design consideration I would see from this is with it catering to more of an adult audience, this application would need to be more of a professional design than that of a cartoon fun feel.

Nintendo. (2017) Corporate Management Policy Briefing /Nine Months Financial Results Briefing for Fiscal Year Ending March 2017. Retrieved January 09, 2021, from https://www.nintendo.co.jp/ir/pdf/2017/170201_2e.pdf

Jorik Weustink. (2019) Why Gamers Play and Why They Buy: A Closer Look at Those Intending to Buy Cyberpunk 2077 and Pokémon Sword/Shield. Retrieved January 09, 2021, from https://newzoo.com/insights/articles/why-gamers-play-and-why-they-buy-a-closer-look-at-those-intending-to-buy-cyberpunk-2077-and-pokemon-sword-shield/

Mike Sonders. (2016) Pokémon GO demographics: The evolving player mix of a smash-hit game. Retrieved January 09, 2021, from https://medium.com/@sm_app_intel/pok%C3%A9mon-go-demographics-the-evolving-player-mix-of-a-smash-hit-game-b9099d5527b7


## User Profile
**Chris** 
* Male
* Interested in - Breeding
* Games Owned - Shield, LVE, Sun, Ultra Moon

**Alex**
* Female
* Interested in - Collecting & Completing Dex
* Games Owned - LVE

**Seth**
* Male
* Interested in - Trading for Mythicals
* Games Owned - Sword, Shield, LVE, LVP, Ultra Sun, Ultra Moon, Sun, Moon

## Use Cases

### Trading a Pokémon
The first use case, a user would select a Pokémon from another user they want to trade with. Once they have selected that Mon, they would click the trade button, with that it would bring up a screen with a list of their Pokémon where they could then select theirs, and finally propose a trade.

### Add/Edit Pokémon
Another use case would be adding and editing a Pokémon for your list. In this use case, after selecting the add/edit button, a form pops up with all the options for it. After submitting, the data would be added to the database and reflect in your list.

### View Pokémon List
Clicking on a user profile or your own profile would bring you to a list of Mons for that particular user. This list would be complete with filtering allowing to sort based off types, balls, abilities, etc. Each Pokémon would have interactions allowing users to edit, trade, or view additional details depending on whether you are looking at yours or another users'.

## Problem Statement

Currently to trade a Pokémon you need to either put one up on the GTS or find other users' Mons on applications like Reddit. While GTS allows searching by Pokémon, it does not allow to look or search for these based off statistics, abilities, or containing balls. Reddit on the other hand allows us to see these types of items, but has no ability to search these specifically. Neither of these services offer tracking for completionists either. To do that, most often people are utilizing a Google sheet. These findings are from years of personal experience using both of these services. 

## Pain Points
Incomplete search functionality - users as they complete a living dex or search to breed Pokémon for certain abilities, moves, or balls, require very specific combinations.
Lack of collection - Most users will want to display their entire collection. In order to do this something like Google sheets is required, but this can be hit and miss on images showing, and keeping this up to date can be difficult.
Lack of communication between applications - Most users to fullfill breeding, living Dex, and collections need to utilize a combination of things like GTS, Reddit, and Google sheets, all of which do not currently communicate.
These pain points are again attributed to my years of being unable to find services to replace these, and frustration at keeping lists updated.

## Solution Statement

This project would implement a list feature for Pokémon collections which have filtering based upon many of the needs for breeding and completionist activities. It would also help in keeping up with lists by offering the ability to directly trade the Pokémon from your list to another user. Because these would all take place inside of the same application, the communication issue between multiple features would not be present. There is also future integration potential if approved by Nintendo to integrate with the Pokémon Home application which would allow the approved trades to actually take place and not simply be a tracking managment application.
## Competition
**[Pokédex Tracker](https://pokedextracker.com/)** - This app allows only tracking whether you have collected all 980 Pokémon. It has no other functionality for trading or breeding.
**[Google Sheets](https://docs.google.com/spreadsheets/d/1nGe7vqP44AXAuhA5v4-Zmbx_aV-jqmqb6wWd1QT6-hI/edit#gid=807605299)** - This is an example of how the Google sheet is typically used. As previously mentioned, there is no ability to trade from this. There is also no way to check and see what is still missing and requires manual updating.
**[Reddit Pokemon Trades](https://www.reddit.com/r/pokemontrades/)** - This subreddit allows users to talk and propose legal Pokémon trades with other users. They have no ability to track or list, and is used exclusively for the social aspect with no list or tracking.
**[Pocketdex](https://www.surenix.me/pocketdex/)** - This app allows users to track their Dex completion and IVs but only functions in that capacity without trade or social functionality.
**[Poke Genie](https://play.google.com/store/apps/details?id=com.cjin.pokegenie.standard&hl=en_US&gl=US)** - This app is more intended for pvp and raid guides, but will track your Pokémon in a list and show their IVs, but no trade or social functionality.

## Key Features

### Pokémon List
In this application each user will have their own Pokémon list set up initially by inputing utilizing the form. Each Mon in the list will contain useful breeding and completionist attributes such as legal balls, hidden attributes, IVs, and egg moves. This will help to track which Pokémon a user has and needs, and give other users a list to help see needs and wants.
### Trades
Once user's have found a Mon they like they will be able to offer a trade to another user. After a trade is accepted and finally marked as complete the user associated with the Pokémon will be updated to transfer to the new user. This will allow for automatic updating of your list without requiring manual entry each time.
### Filtering
Filtering in lists will include many needed attributes such as ball stored in, hidden ability, IVs, and egg moves. This will allow users who need certain moves or abilities with breeding. It will also help with the completionists by finding the combinations that they are currently missing.
### Wishlist
To help similarly to filtering, users are able to create themselves a wishlist. In this list they are able to put the combinations of what they still need. Rather than a user coming to and looking through all the existing Pokémon and trying to determine what they have they could trade, a user could look through the wishlist to see what they have to offer.
### Communication
Often users will have questions and want to know if they could breed something specifically. By offering an inbox for private messages they will have the ability to do this. This will help users solve the main issue of finding existing or new Mons to help complete their list or get needed breeder Pokémon.

## Integrations

I will be utilizing a data set that I created in the past with the intent of creating an application like this for Pokéballs, moves, and Pokémon which include a list of abilities, included moves, and legal balls. 
